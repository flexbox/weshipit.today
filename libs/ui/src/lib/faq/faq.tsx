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
    <div className="py-24">
      {/* Pages that render their own heading pass title="" — skip the empty h2. */}
      {title && (
        <Text as="h2" variant="h3" className="mb-8 px-4" id={headingId}>
          {title}
        </Text>
      )}

      <div>
        {faqs.map((item, index) => (
          <Disclosure
            key={item.id}
            as="div"
            className="py-2"
            defaultOpen={index === 0}
          >
            {/* The heading wraps the button: a heading inside a <button> is
                invalid HTML and drops the question from the heading outline. */}
            <Text as="h3" variant="p1" className="font-semibold">
              <DisclosureButton className="group flex w-full cursor-pointer items-start justify-between gap-6 rounded-xl px-4 py-3 text-left transition-colors duration-150 hover:bg-slate-900/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:hover:bg-white/5">
                {item.question}
                {/* One line tall, so the chevron sits on the first line of a
                    question that wraps. */}
                <span className="flex h-lh shrink-0 items-center">
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 text-slate-400 transition-[rotate,color] duration-200 ease-out group-hover:text-slate-600 group-data-[open]:rotate-180 dark:text-slate-500 dark:group-hover:text-slate-300"
                  />
                </span>
              </DisclosureButton>
            </Text>
            {/* unmount={false} keeps closed answers in the server-rendered
                HTML (hidden), so they match the FAQPage structured data and
                stay indexable. */}
            <DisclosurePanel
              unmount={false}
              transition
              className="px-4 pt-1 pb-4 pr-15 transition-[opacity,translate] duration-200 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <p className="max-w-prose text-base leading-relaxed text-pretty text-slate-600 sm:text-lg dark:text-slate-300">
                {item.answer}
              </p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

export default Faq;
