import { SendVerificationRequestParams } from 'next-auth/providers';
import { resend } from '@/lib/email/resend';
import Email from '../../../../react-email/emails/verification';

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: params.identifier,
      subject: 'Verify your email address - Uniscopia Group',
      react: Email({ url: params.url }),
    });
  } catch (error) {
    console.log({ error });
  }
};
