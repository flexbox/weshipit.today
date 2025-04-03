import { RichTextField, asText } from '@prismicio/client';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Text } from '../text/text';
import Hyperlink from '../hyperlink/hyperlink';

export interface FaqProps {
  id: string;
  data: {
    question: RichTextField;
    answer: RichTextField;
  };
}

interface FaqListProps {
  faqs: FaqProps[];
}

export function Faq({ faqs }: FaqListProps) {
  return (
    <div className="flex flex-col gap-6 py-24">
      <Text as="h2" variant="h3" className="px-4">
        Frequently Asked Questions
      </Text>

      {faqs.map((item) => (
        <div key={item.id}>
          <Disclosure
            as="div"
            className="cursor-pointer rounded-md transition-colors duration-200 ease-in-out hover:bg-white dark:hover:bg-slate-800"
            defaultOpen={false}
          >
            <DisclosureButton className="group flex w-full items-center justify-between px-4 py-3">
              <Text
                as="h2"
                variant="s2"
                className="my-4 text-left font-semibold"
              >
                {asText(item.data.question)}
              </Text>
              <ChevronDownIcon className="size-5 group-data-[open]:rotate-180  dark:fill-white/60" />
            </DisclosureButton>
            <DisclosurePanel className="px-4 pb-4">
              <Text as="p" variant="p2">
                {asText(item.data.answer)}
              </Text>
            </DisclosurePanel>
          </Disclosure>
        </div>
      ))}
    </div>
  );
}

export default Faq;
