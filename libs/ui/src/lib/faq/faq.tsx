import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Text } from '../text/text';

export interface FaqProps {
  id: string;
  question: string;
  answer: string;
}

interface FaqListProps {
  faqs: FaqProps[];
  title?: string;
  headingId?: string;
}

export function Faq({
  faqs,
  title = 'Frequently Asked Questions',
  headingId,
}: FaqListProps) {
  return (
    <div className="flex flex-col gap-6 py-24">
      <Text as="h2" variant="h3" className="px-4" id={headingId}>
        {title}
      </Text>

      {faqs.map((item, index) => (
        <div key={item.id}>
          <Disclosure
            as="div"
            className="cursor-pointer rounded-md transition-colors duration-200 ease-in-out hover:bg-white dark:hover:bg-slate-800"
            defaultOpen={index === 0}
          >
            <DisclosureButton className="group flex w-full items-center justify-between px-4 py-3">
              <Text
                as="h3"
                variant="p1"
                className="my-2 text-left font-semibold"
              >
                {item.question}
              </Text>
              <ChevronDownIcon className="size-5 group-data-[open]:rotate-180  dark:fill-white/60" />
            </DisclosureButton>
            <DisclosurePanel className="px-4 pb-4">
              <Text as="p" variant="p2">
                {item.answer}
              </Text>
            </DisclosurePanel>
          </Disclosure>
        </div>
      ))}
    </div>
  );
}

export default Faq;
