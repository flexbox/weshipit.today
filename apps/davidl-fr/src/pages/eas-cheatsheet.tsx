import Link from 'next/link';
import { PrimaryButton } from '~/components/Button';
import Page, { ContentContainer, SectionImg } from '~/components/Page';
import { H1, P } from '~/components/Typography';

const ShareBox = () => (
  <div className="flex items-center gap-3">
    <section className="mx-auto hidden w-full max-w-screen-md items-center justify-center overflow-hidden border border-gray-200 bg-transparent pt-5 sm:pl-5 sm:pt-0 md:rounded-lg lg:flex dark:border-white/10">
      <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-1 text-sm">
          Share with your coworkers
        </div>
        <div className="flex w-full items-center justify-center divide-x divide-gray-200 border-t border-gray-200 pt-0 sm:w-auto sm:border-t-0 md:border-transparent dark:divide-white/10 dark:border-white/10">
          <a
            href="https://twitter.com/intent/tweet?text=Expo%20Application%20Cheat%20Sheet%20by%20%40flexbox_&url=https%3A%2F%2Fdavidl.fr%2Feas-cheatsheet"
            className="flex size-full items-center justify-center p-3 transition hover:bg-gray-900/5 dark:hover:bg-white/5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="size-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              role="presentation"
              viewBox="0 0 512 512"
            >
              <path
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="sr-only">share on twitter</span>
          </a>
          <a
            href="https://facebook.com/sharer/sharer.php?u=https://davidl.fr/eas-cheatsheet"
            className="flex size-full items-center justify-center p-3 transition hover:bg-gray-900/5 dark:hover:bg-white/5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="size-4"
              aria-hidden="true"
              viewBox="0 0 16 16"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="currentColor">
                <path
                  d="M16,8.048a8,8,0,1,0-9.25,7.9V10.36H4.719V8.048H6.75V6.285A2.822,2.822,0,0,1,9.771,3.173a12.2,12.2,0,0,1,1.791.156V5.3H10.554a1.155,1.155,0,0,0-1.3,1.25v1.5h2.219l-.355,2.312H9.25v5.591A8,8,0,0,0,16,8.048Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
            <span className="sr-only">share on facebook</span>
          </a>
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://davidl.fr/eas-cheatsheet"
            className="flex size-full items-center justify-center p-3 transition hover:bg-gray-900/5 dark:hover:bg-white/5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="size-4"
              aria-hidden="true"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              role="presentation"
            >
              <g fill="currentColor">
                <path
                  d="M15.3,0H0.7C0.3,0,0,0.3,0,0.7v14.7C0,15.7,0.3,16,0.7,16h14.7c0.4,0,0.7-0.3,0.7-0.7V0.7 C16,0.3,15.7,0,15.3,0z M4.7,13.6H2.4V6h2.4V13.6z M3.6,5C2.8,5,2.2,4.3,2.2,3.6c0-0.8,0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4 C4.9,4.3,4.3,5,3.6,5z M13.6,13.6h-2.4V9.9c0-0.9,0-2-1.2-2c-1.2,0-1.4,1-1.4,2v3.8H6.2V6h2.3v1h0c0.3-0.6,1.1-1.2,2.2-1.2 c2.4,0,2.8,1.6,2.8,3.6V13.6z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
            <span className="sr-only">share on linkedin</span>
          </a>
          <a
            href="https://reddit.com/submit/?url=https%3A%2F%2Fdavidl.fr%2Feas-cheatsheet&amp;title=Expo%20Application%20Cheat%20Sheet"
            className="flex size-full items-center justify-center p-3 transition hover:bg-gray-900/5 dark:hover:bg-white/5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="size-4"
              aria-hidden="true"
              viewBox="0 0 16 16"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="currentColor">
                <path
                  d="M16,7.9c0-1.1-0.9-1.9-1.9-1.9c-0.5,0-0.9,0.2-1.2,0.4c-1.2-0.7-2.7-1.2-4.3-1.3l0.8-2.6L11.7,3 c0.1,0.8,0.8,1.5,1.6,1.5c0.9,0,1.6-0.7,1.6-1.6c0-0.9-0.7-1.6-1.6-1.6c-0.6,0-1.2,0.4-1.4,0.9L9.2,1.5C9,1.5,8.8,1.6,8.7,1.8 l-1,3.3C6,5.1,4.4,5.6,3.1,6.3C2.8,6.1,2.4,5.9,1.9,5.9C0.9,5.9,0,6.8,0,7.9c0,0.7,0.3,1.2,0.8,1.6c0,0.2,0,0.3,0,0.5 c0,1.3,0.8,2.6,2.2,3.5c1.3,0.9,3.1,1.4,5,1.4c1.9,0,3.7-0.5,5-1.4c1.4-0.9,2.2-2.1,2.2-3.5c0-0.1,0-0.3,0-0.4 C15.6,9.1,16,8.5,16,7.9z M4.5,9c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1s-0.5,1.1-1.1,1.1C5,10.1,4.5,9.6,4.5,9z M10.6,12.2 c-0.6,0.6-1.4,0.8-2.6,0.8c0,0,0,0,0,0c0,0,0,0,0,0c-1.2,0-2.1-0.3-2.6-0.8c-0.2-0.2-0.2-0.4,0-0.6c0.2-0.2,0.4-0.2,0.6,0 c0.4,0.4,1,0.6,2,0.6c0,0,0,0,0,0c0,0,0,0,0,0c1,0,1.6-0.2,2-0.6c0.2-0.2,0.4-0.2,0.6,0C10.8,11.8,10.8,12.1,10.6,12.2z M10.4,10.1 c-0.6,0-1.1-0.5-1.1-1.1c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C11.5,9.6,11,10.1,10.4,10.1z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
            <span className="sr-only">share on reddit</span>
          </a>
        </div>
      </div>
    </section>
    <Link href="/eas-cheatsheet-pdf" passHref legacyBehavior>
      <PrimaryButton>Download PDF</PrimaryButton>
    </Link>
  </div>
);

const EasCheatSheetPage = () => (
  <Page withHeader>
    <H1>Expo Application Service Cheat Sheet</H1>
    <div className="p-8">
      <ShareBox />
    </div>

    <ContentContainer className="mb-12">
      <P>
        EAS (Expo Application Services) is the toolchain for shipping Expo apps:
        building, submitting to the App Store and Play Store, OTA updates, web
        deploys via EAS Hosting, and CI/CD via EAS Workflows. This cheat sheet
        groups the commands you reach for daily.
      </P>
    </ContentContainer>
    <SectionImg
      src={'/images/eas-cheat-sheet.png'}
      alt={'Expo Application Service Cheat Sheet'}
    />
  </Page>
);

export default EasCheatSheetPage;
