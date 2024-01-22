import { SendVerificationRequestParams } from 'next-auth/providers';
import { resend } from '@/lib/utils/resend';
import { siteConfig } from '@/config/site';

import VerificationEmail from '@/lib/email/templates/verification-email';
import prismadb from '@/lib/utils/database';

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const user = await prismadb.user.findUnique({
    where: {
      email: params.identifier,
    },
    select: {
      emailVerified: true,
    },
  });

  const template = {
    SignIn: {
      subject: `Verify your e-mail address - ${siteConfig.name}`,
      react: <VerificationEmail params={params} />,
    },
    NewUser: {
      subject: `Activate your account - ${siteConfig.name}`,
      react: <VerificationEmail params={params} />,
    },
  };

  const selection = user?.emailVerified ? template.SignIn : template.NewUser;

  try {
    await resend.emails.send({
      from: `${siteConfig.name} <${process.env.EMAIL_FROM as string}>`,
      to: params.identifier,
      subject: selection.subject,
      react: selection.react,
      headers: {
        'X-Entity-Ref-ID': new Date().getTime() + '',
      },
    });
  } catch (error) {
    console.log({ error });
  }
};
