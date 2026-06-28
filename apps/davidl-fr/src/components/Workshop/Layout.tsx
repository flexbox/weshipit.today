import React, { PropsWithChildren } from 'react';
import { useUser } from '~/lib/useUser';
import { InnerPageContainer } from '~/components/Page/style';
import { NewIssueLink } from '~/components/Workshop/NewIssueLink';
import { ButtonCheckGitHub } from '~/components/Workshop/ButtonCheckGitHub';
import { HeaderWithMenu } from '~/components/Workshop/HeaderWithMenu';
import { Footer } from '~/components/Workshop/Footer';
import { ChallengeStatus } from '~/components/Workshop/ChallengeStatus';
import { WorkshopSeo } from '~/components/SEO/WorkshopSeo';
import { ElaborationResult } from '~/components/Workshop/Elaboration';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { Sidebar } from '~/components/Workshop/Sidebar';

interface LayoutProps extends PropsWithChildren {
  isChallenge?: boolean;
  withFooter?: boolean;
  routerQueryId?: string;
}

const LayoutActionBar = () => {
  return (
    <div className="mb-8 flex w-full max-w-2xl items-center">
      <div className="mr-2">
        <ButtonCheckGitHub />
      </div>
      <div className="mr-auto">
        <NewIssueLink />
      </div>
    </div>
  );
};

const Layout = ({
  children,
  isChallenge = false,
  withFooter = true,
}: LayoutProps) => {
  const user = useUser();

  return (
    <>
      <WorkshopSeo />
      <HeaderWithMenu user={user} />

      {isChallenge ? (
        <div className="flex">
          <Sidebar user={user} />

          <main className="m-auto py-16">
            <div className="max-w-screen-sm">
              <LayoutActionBar />

              <div className="mb-4 w-full" style={{ maxWidth: 600 }}>
                <ChallengeStatus />
              </div>

              <ProseContainer style="mb-8">
                {children}
                <ElaborationResult />
              </ProseContainer>
            </div>
          </main>
        </div>
      ) : (
        <div className="mt-12">
          <InnerPageContainer role="main">{children}</InnerPageContainer>
          {withFooter && <Footer />}
        </div>
      )}
    </>
  );
};

export default Layout;
