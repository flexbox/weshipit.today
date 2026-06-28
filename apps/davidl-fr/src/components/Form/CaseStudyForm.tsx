import React, { ReactNode } from 'react';
import Frame from '~/components/Onboarding/Frame';

import { H3, Rarr } from '~/components/Typography';
import { AIRTABLE_FORM } from '~/utils/airtable-links';

const CaseStudyFormContainer = ({ children }: { children: ReactNode }) => {
  return <div className="my-24 max-w-4xl pt-8">{children}</div>;
};

export const CaseStudyForm = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  function toggleNavigation() {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <CaseStudyFormContainer>
      {isFormOpen ? (
        <Frame src={AIRTABLE_FORM.ROAST_MOBILE_APP} height="1220" />
      ) : (
        <div className="rounded-xl bg-white p-6 duration-300 ease-in-out hover:shadow-xl sm:p-12 dark:bg-gray-900 ">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-col">
              <H3>Receive a personalized case study.</H3>
              <p className="my-4">
                Stop wasting your time and money on marketing for a broken UX.{' '}
                <strong>Turn more visitors into customers</strong> with a mobile
                app that spark’s joy.
              </p>

              <button
                onClick={toggleNavigation}
                className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-500"
              >
                <span className="">Get UX advices</span> <Rarr />
              </button>
            </div>

            <div className="flex-col">
              <ul className="list-inside list-disc pt-4">
                <li>Improve the ROI of your marketing</li>
                <li>
                  Your personalised video and a list of conversion fixes sent
                  back within 4 days
                </li>
                <li>
                  Not happy? 100% money back guarantee, no questions asked
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </CaseStudyFormContainer>
  );
};
