import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { formatTeamUrl } from '@documenso/lib/utils/teams';

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '../components';
import { useBranding } from '../providers/branding';
import { TemplateFooter } from '../template-components/template-footer';
import TemplateImage from '../template-components/template-image';

export type ConfirmTeamEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  teamName: string;
  teamUrl: string;
  token: string;
};

export const ConfirmTeamEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  teamName = 'Team Name',
  teamUrl = 'demo',
  token = '',
}: ConfirmTeamEmailProps) => {
  const { _ } = useLingui();
  const branding = useBranding();

  const previewText = msg`Accept team email request for ${teamName} on Documenso`;

  return (
    <Html>
      <Head />
      <Preview>{_(previewText)}</Preview>

      <Body className="mx-auto my-auto font-sans">
        <Section className="bg-white">
          <Container className="mx-auto mb-2 mt-8 max-w-xl rounded-lg border border-solid border-slate-200 px-2 pt-2 backdrop-blur-sm">
            {branding.brandingEnabled && branding.brandingLogo ? (
              <Img src={branding.brandingLogo} alt="Branding Logo" className="mb-4 h-6 p-2" />
            ) : (
              <TemplateImage
                assetBaseUrl={assetBaseUrl}
                className="mb-4 h-6 p-2"
                staticAsset="logo.png"
              />
            )}

            <Section>
              <TemplateImage
                className="mx-auto"
                assetBaseUrl={assetBaseUrl}
                staticAsset="mail-open.png"
              />
            </Section>

            <Section className="p-2 text-slate-500">
              <Text className="text-center text-lg font-medium text-black">
                <Trans>Verify your team email address</Trans>
              </Text>

              <Text className="text-center text-base">
                <Trans>
                  <span className="font-bold">{teamName}</span> has requested to use your email
                  address for their team on Documenso.
                </Trans>
              </Text>

              <div className="mx-auto mt-6 w-fit rounded-lg bg-gray-50 px-4 py-2 text-base font-medium text-slate-600">
                {formatTeamUrl(teamUrl, baseUrl)}
              </div>

              <Section className="mt-6">
                <Text className="my-0 text-sm">
                  <Trans>
                    By accepting this request, you will be granting <strong>{teamName}</strong>{' '}
                    access to:
                  </Trans>
                </Text>

                <ul className="mb-0 mt-2">
                  <li className="text-sm">
                    <Trans>View all documents sent to and from this email address</Trans>
                  </li>
                  <li className="mt-1 text-sm">
                    <Trans>Allow document recipients to reply directly to this email address</Trans>
                  </li>
                  <li className="mt-1 text-sm">
                    <Trans>Send documents on behalf of the team using the email address</Trans>
                  </li>
                </ul>

                <Text className="mt-2 text-sm">
                  <Trans>
                    You can revoke access at any time in your team settings on Documenso{' '}
                    <Link href={`${baseUrl}/settings/teams`}>here.</Link>
                  </Trans>
                </Text>
              </Section>

              <Section className="mb-6 mt-8 text-center">
                <Button
                  className="bg-documenso-500 inline-flex items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-medium text-black no-underline"
                  href={`${baseUrl}/team/verify/email/${token}`}
                >
                  <Trans>Accept</Trans>
                </Button>
              </Section>
            </Section>

            <Text className="text-center text-xs text-slate-500">
              <Trans>Link expires in 1 hour.</Trans>
            </Text>
          </Container>

          <Hr className="mx-auto mt-12 max-w-xl" />

          <Container className="mx-auto max-w-xl">
            <TemplateFooter isDocument={false} />
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default ConfirmTeamEmailTemplate;
