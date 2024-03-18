import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prismadb from '@/lib/utils/database';
import { sendVerificationRequest } from '@/lib/email/verificationRequest';
import { createUserSettings } from './create-user-settings';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM as string,
      sendVerificationRequest,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  events: {
    async createUser(message) {
      await createUserSettings(message);
    },
  },

  callbacks: { 
    async jwt({ user, token }) {
      //pass user ID to token if signed in
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },

    async session({ session, token }) {
      //pass user ID to session from token
      return {
        ...session,
        user: { id: token.id, ...session.user },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
};
