import {
  Button,
  Html,
  Body,
  Heading,
  Text,
  Head,
  Container,
  Hr,
  Section,
  Preview,
  Tailwind,
} from '@react-email/components';

import * as React from 'react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

interface emailProps {
  params: {
    url: string;
  };
}

export default function VerificationEmail({ params }: emailProps) {
  return (
    <Html>
      <Head />
      <Preview>You have received a verification link</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-stone-50 font-sans">
          <Container className="mx-auto my-[40px] rounded border border-solid border-stone-100 bg-white p-4">
            <Section>
              <Heading className=" font-heading">Verification link</Heading>
              <Text>
                This link expires in 24 hours and can only be used once.
              </Text>
              <Button
                href={params?.url || baseUrl}
                className="p-4 rounded-sm bg-stone-900 text-white"
              >
                Sign-in
              </Button>
            </Section>
            <Section>
              <Hr className="w-full border border-solid border-stone-200" />
              <Text className=" mt-2 text-xs text-stone-600">
                If you did not try to log into your account, you can safely
                ignore it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
