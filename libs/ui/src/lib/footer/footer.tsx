import { Hyperlink } from '../hyperlink/hyperlink';
import Link from 'next/link';
import { SVGProps } from 'react';

const navigation = {
  solutions: [
    { name: 'React Native Tools', href: '/react-native-tools' },
    { name: 'React Native Starters', href: '/react-native-starters' },
    { name: 'React Native Audit', href: '/audit' },
  ],
  company: [
    { name: 'Consulting', href: '/consulting' },
    { name: 'Partners', href: '/clients' },
    {
      name: 'Sponsorship',
      href: 'https://github.com/sponsors/flexbox?frequency=one-time&sponsor=flexbox',
    },
    {
      name: 'Jobs',
      href: 'https://flexbox.notion.site/Jobs-1c65e7a956a64a07b60a401f8747f1af',
    },
  ],
  social: [
    {
      name: 'X',
      href: 'https://twitter.com/intent/follow?screen_name=flexbox_',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/flexbox',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UCO0X5b0mQ4eIHitXHXSFUyw?sub_confirmation=1',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

function FooterLink(item: { name: string; href: string }) {
  if (item.href.startsWith('https')) {
    return (
      <Hyperlink
        href={item.href}
        className="text-base text-slate-400 hover:text-slate-900 dark:hover:text-white"
        isExternal
      >
        {item.name}
      </Hyperlink>
    );
  }

  return (
    <Link
      href={item.href}
      className="text-base text-slate-400 hover:text-slate-900 dark:hover:text-white"
    >
      {item.name}
    </Link>
  );
}

export function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mb-6">
                <h3 className="text-base font-medium text-slate-900 dark:text-slate-200">
                  Solutions
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <FooterLink {...item} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-900 dark:text-slate-200">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <FooterLink {...item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-8 xl:mt-0">
            <p className="text-base leading-7 text-slate-400">
              Are you looking to <strong>build a React Native app</strong>?
              <br /> Look no further than weshipit.today, the #1 destination for
              finding tools, discovering launch advices, and finding partners to
              successfully release your React Native app today.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-400 hover:text-slate-400"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-slate-400 md:order-1 md:mt-0">
            &copy; {fullYear} weshipit.today, SASU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
