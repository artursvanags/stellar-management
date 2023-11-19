import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

import { PrismaAdapter } from '@auth/prisma-adapter';

import prismadb from '@/lib/database';
import { sendVerificationRequest } from '@/lib/email/verificationRequest';

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
  secret: process.env.NEXTAUTH_SECRET as string,
  session: { strategy: 'jwt' },
};
