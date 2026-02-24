import { Hyperlink } from '../hyperlink/hyperlink';
import Link from 'next/link';
import { JSX, SVGProps } from 'react';
import LinkButton from '../button/link-button';

const navigation = {
  company: [
    { href: '/consulting', name: 'Consulting' },
    { href: '/customers', name: 'Customers' },
    { href: '/about', name: 'About' },
    { href: '/podcast', name: 'Podcast' },
    {
      href: 'https://github.com/sponsors/flexbox?frequency=one-time&sponsor=flexbox',
      name: 'Sponsorship',
    },
    {
      href: 'https://flexbox.notion.site/Jobs-1c65e7a956a64a07b60a401f8747f1af',
      name: 'Jobs',
    },
    { href: '/terms-of-service', name: 'Terms' },
  ],
  social: [
    {
      href: 'https://x.com/intent/follow?screen_name=flexbox_',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      ),
      name: 'X',
    },
    {
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
      name: 'GitHub',
    },
    {
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
      name: 'YouTube',
    },
    {
      href: 'https://join.slack.com/t/weblille/shared_invite/zt-87i4ozyq-K5GRJKAFqKp_w9IHjleW~Q',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg
          fill="currentColor"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          role="img"
          {...props}
        >
          <title>Join our Slack community</title>
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
        </svg>
      ),
      name: 'Slack',
    },
  ],
  resources: [
    { href: '/react-native-resources', name: 'Start Learning' },
    { href: '/react-native-tools', name: 'React Native Tools' },
    { href: '/react-native-starters', name: 'React Native Starters' },
    { href: '/audit', name: 'React Native Audit' },
    { href: '/french-react-native-apps', name: 'React Native Apps 🇫🇷 ' },
    { href: '/react-native-migration', name: 'React Native Migration' },
    { href: '/react-native-glossary', name: 'React Native Glossary' },
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

function AISearch() {
  const query =
    'As a potential client with a React Native mobile app, I want to concretely understand what I will receive when I hire weshipit.today. Detail step by step what the service includes. Explain it simply, as if you were describing the real experience of the service.';
  const queryURI = encodeURI(query);

  return (
    <div className="my-12 pt-6 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col items-center justify-center w-full py-8 gap-6">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-base text-slate-400 text-center">
            Request an AI summary of weshipit.today
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform hover:scale-110 cursor-pointer w-10 h-10 rounded-full overflow-hidden p-1.5"
              href={`https://chat.openai.com/?q=${queryURI}`}
            >
              <svg
                viewBox="0 0 320 320"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-slate-400 hover:fill-slate-900 dark:hover:fill-white"
              >
                <path d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z" />
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform hover:scale-110 cursor-pointer w-10 h-10 rounded-full overflow-hidden p-1.5"
              href={`https://claude.ai/new?q=${queryURI}`}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="1024.000000pt"
                height="1024.000000pt"
                viewBox="0 0 1024.000000 1024.000000"
                preserveAspectRatio="xMidYMid meet"
                className="fill-slate-400 hover:fill-slate-900 dark:hover:fill-white"
              >
                <g
                  transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M2760 10208 l-85 -29 -158 -216 -159 -216 7 -71 c9 -94 29 -194 72
-351 42 -155 35 -140 189 -387 192 -306 701 -1188 1040 -1799 169 -305 318
-571 331 -592 27 -42 22 -62 -22 -91 l-26 -17 -92 74 c-51 41 -333 252 -627
469 -294 216 -733 547 -975 734 -748 578 -713 553 -769 569 -28 8 -133 19
-233 26 -149 10 -185 10 -198 -1 -9 -7 -74 -77 -144 -154 l-128 -141 33 -213
c19 -118 40 -222 47 -231 109 -151 143 -185 277 -274 74 -50 275 -192 445
-316 171 -123 542 -378 825 -565 646 -426 1571 -1053 1628 -1103 42 -37 42
-39 31 -72 l-12 -33 -116 5 c-64 2 -332 28 -596 56 -296 31 -637 60 -890 76
-523 31 -1815 120 -2048 140 l-178 15 -103 -69 c-103 -70 -104 -70 -110 -118
-4 -26 -9 -60 -12 -74 -4 -21 14 -50 97 -160 56 -74 109 -142 118 -151 9 -10
63 -27 132 -42 98 -22 186 -29 575 -51 616 -33 1566 -72 2129 -85 253 -6 567
-18 698 -26 131 -8 247 -14 257 -14 11 0 26 -12 33 -26 12 -23 12 -33 -3 -70
-9 -24 -20 -48 -26 -53 -5 -5 -461 -263 -1014 -573 l-1005 -564 -390 -268
c-220 -151 -415 -293 -447 -324 l-58 -57 -14 -160 c-13 -147 -13 -161 2 -176
10 -8 56 -52 104 -98 l86 -83 243 32 243 31 1348 875 c741 481 1354 877 1362
880 10 4 15 -5 18 -30 4 -34 -6 -48 -195 -268 -109 -127 -330 -403 -490 -612
-160 -210 -528 -682 -817 -1051 -290 -369 -565 -726 -612 -795 l-85 -125 -12
-116 c-18 -185 -33 -158 141 -245 l152 -76 92 38 92 39 364 390 364 390 470
635 c258 349 605 820 769 1047 255 349 304 412 328 415 15 3 30 1 33 -4 3 -4
-11 -69 -31 -143 -23 -89 -58 -280 -100 -558 -35 -232 -71 -456 -80 -497 -9
-41 -79 -381 -155 -755 -76 -374 -166 -806 -200 -959 l-61 -280 68 -159 68
-159 131 -99 131 -100 156 61 156 61 65 77 c53 62 66 84 70 122 4 25 67 702
141 1505 74 803 137 1481 141 1507 5 39 10 48 35 58 16 7 31 11 33 9 1 -2 111
-189 243 -414 300 -511 753 -1206 1138 -1746 159 -222 289 -405 289 -406 1 0
66 -13 146 -27 l145 -27 125 44 125 44 39 74 39 73 -26 235 -26 235 -595 892
c-632 946 -637 954 -566 954 26 0 94 -53 408 -317 207 -175 474 -402 592 -505
138 -120 380 -311 675 -533 253 -191 466 -350 475 -355 8 -4 45 -11 81 -15
l67 -7 67 93 c75 106 73 90 34 257 l-20 90 -582 539 c-320 297 -748 690 -952
873 -203 184 -479 439 -612 569 -204 197 -243 239 -243 263 0 25 4 28 31 28
16 0 173 -36 347 -80 174 -43 829 -201 1454 -349 l1137 -270 258 132 258 132
18 103 18 104 -103 138 -103 137 -163 108 c-89 59 -170 109 -180 111 -9 2
-289 25 -621 49 -551 41 -635 45 -965 45 -412 1 -540 7 -1001 51 -311 29 -360
38 -337 61 19 19 1449 348 1927 444 301 60 699 149 946 210 l425 105 70 172
70 172 -18 80 c-10 44 -24 85 -31 91 -7 6 -87 45 -178 87 l-166 77 -379 -65
c-704 -121 -1047 -186 -1659 -316 -335 -71 -631 -132 -656 -135 -42 -6 -49 -4
-63 19 -16 24 -14 29 153 315 152 262 195 326 427 639 291 391 564 747 866
1129 112 142 214 273 225 289 12 17 54 139 92 273 l71 243 -162 240 -162 239
-222 0 -223 0 -118 -94 c-119 -95 -339 -321 -638 -656 -174 -195 -787 -960
-1050 -1310 -110 -146 -228 -295 -264 -332 -60 -64 -67 -68 -108 -68 -23 0
-43 3 -43 7 0 12 165 885 284 1506 64 334 146 797 186 1063 l73 471 -103 148
-103 147 -124 59 -124 58 -161 -107 -162 -107 -78 -190 c-93 -225 -81 -146
-164 -1105 -30 -349 -74 -808 -99 -1020 -24 -212 -59 -575 -77 -807 l-32 -423
-28 0 c-37 0 -47 24 -122 280 l-57 195 -428 835 c-436 850 -597 1189 -991
2095 -131 303 -129 299 -265 411 l-46 37 -202 28 c-111 16 -209 28 -217 28 -8
0 -53 -14 -100 -31z"
                  />
                </g>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform hover:scale-110 cursor-pointer w-10 h-10 rounded-full overflow-hidden p-1.5"
              href={`https://gemini.google.com/app?q=${queryURI}`}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="1024.000000pt"
                height="1024.000000pt"
                viewBox="0 0 1024.000000 1024.000000"
                preserveAspectRatio="xMidYMid meet"
                className="fill-slate-400 hover:fill-slate-900 dark:hover:fill-white"
              >
                <g
                  transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M5035 9790 c-83 -40 -104 -73 -149 -236 -244 -886 -698 -1720 -1311
-2409 -757 -851 -1787 -1491 -2885 -1790 -145 -40 -191 -64 -230 -121 -35 -52
-40 -147 -11 -208 36 -74 72 -93 295 -157 383 -109 669 -221 1038 -405 1156
-578 2091 -1507 2667 -2653 123 -243 212 -449 295 -679 56 -154 86 -252 166
-528 9 -34 30 -78 45 -97 77 -102 254 -102 331 -1 18 23 43 92 75 207 118 414
228 695 425 1087 368 734 881 1380 1509 1904 650 541 1411 942 2230 1172 184
52 223 74 260 147 50 102 18 220 -78 281 -12 8 -83 31 -157 51 -785 215 -1528
597 -2178 1118 -969 778 -1689 1877 -2018 3081 -42 154 -67 196 -137 231 -62
30 -126 32 -182 5z"
                  />
                </g>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform hover:scale-110 cursor-pointer w-10 h-10 rounded-full overflow-hidden p-1.5"
              href={`https://x.com/i/grok?text=${queryURI}`}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="512.000000pt"
                height="492.000000pt"
                viewBox="0 0 512.000000 492.000000"
                preserveAspectRatio="xMidYMid meet"
                className="fill-slate-400 hover:fill-slate-900 dark:hover:fill-white"
              >
                <g
                  transform="translate(0.000000,492.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M3880 3673 c-669 -670 -1366 -1370 -1550 -1556 l-335 -339 850 628
c524 388 866 633 891 642 32 10 51 11 81 3 64 -17 89 -44 121 -129 137 -360
116 -786 -58 -1133 -129 -255 -386 -506 -643 -628 -180 -85 -334 -121 -542
-128 -181 -6 -305 10 -482 63 l-122 36 -286 -133 -286 -132 68 -45 c94 -62
308 -164 429 -206 641 -220 1327 -91 1851 348 391 326 630 794 673 1317 16
189 1 363 -55 629 -76 366 -81 630 -15 885 67 257 190 483 498 913 72 100 130
182 129 182 -1 0 -549 -548 -1217 -1217z"
                  />
                  <path
                    d="M2535 4343 c-260 -16 -536 -89 -759 -200 -510 -255 -887 -738 -1009
-1294 -41 -183 -50 -291 -44 -498 8 -246 42 -413 127 -633 53 -135 70 -219 70
-341 0 -166 -47 -310 -155 -479 -90 -138 -141 -199 -410 -488 -155 -166 -249
-271 -324 -364 -14 -17 -14 -18 -1 -11 15 9 1495 1329 1559 1391 l34 33 -57
62 c-87 94 -153 192 -217 324 -97 199 -136 394 -126 619 15 343 150 664 383
915 374 402 975 552 1485 372 l81 -29 102 48 c55 26 124 58 151 70 28 13 91
42 140 65 50 23 109 50 133 60 23 10 42 22 42 25 0 13 -149 103 -255 155 -225
110 -469 175 -725 195 -74 5 -144 9 -155 8 -11 -1 -42 -3 -70 -5z"
                  />
                </g>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform hover:scale-110 cursor-pointer w-10 h-10 rounded-full overflow-hidden p-1.5"
              href={`https://www.perplexity.ai/?q=${queryURI}`}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="300.000000pt"
                height="300.000000pt"
                viewBox="0 0 300.000000 300.000000"
                preserveAspectRatio="xMidYMid meet"
                className="fill-slate-400 hover:fill-slate-900 dark:hover:fill-white"
              >
                <g
                  transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M560 2557 c0 -404 -1 -435 -17 -442 -10 -3 -90 -5 -178 -4 l-160 2 0
-649 0 -649 175 -2 175 -2 5 -403 5 -403 50 45 c91 82 417 382 606 557 103 95
192 173 198 173 8 0 11 -110 11 -380 l0 -380 70 0 70 0 0 368 c0 203 3 372 6
375 4 4 30 -14 58 -40 28 -25 197 -176 376 -336 179 -159 344 -307 367 -328
23 -22 47 -39 52 -39 7 0 12 128 13 396 l3 395 175 2 175 2 0 649 0 650 -115
-3 c-64 -1 -128 1 -143 4 l-27 7 0 430 c0 267 -4 428 -9 426 -6 -1 -101 -80
-213 -175 -582 -492 -703 -591 -710 -587 -4 3 -8 176 -8 385 l0 379 -70 0 -70
0 0 -380 c0 -267 -3 -380 -11 -380 -6 0 -124 105 -262 233 -412 380 -567 521
-582 530 -13 7 -15 -47 -15 -426z m172 90 c7 -7 138 -127 291 -266 200 -182
275 -256 265 -262 -18 -12 -549 -11 -568 1 -12 8 -16 47 -18 232 -3 198 2 308
13 308 2 0 10 -6 17 -13z m1638 -252 c0 -251 -1 -265 -19 -275 -22 -11 -595
-13 -624 -1 -15 5 46 61 298 274 174 147 323 267 331 267 12 0 14 -43 14 -265z
m-1066 -432 c4 -4 -162 -176 -369 -383 l-375 -376 0 -122 0 -122 -105 0 -105
0 0 498 c0 274 3 502 7 505 9 9 938 9 947 0z m1344 -500 l2 -503 -105 0 -105
0 0 122 0 122 -375 376 c-207 207 -372 379 -369 383 4 4 219 6 478 5 l471 -3
3 -502z m-1218 -42 l0 -429 -357 -327 c-354 -323 -358 -326 -366 -298 -4 15
-5 197 -2 403 l6 375 352 353 c194 193 355 352 359 352 5 0 8 -193 8 -429z
m507 77 l353 -353 0 -403 c0 -252 -4 -402 -10 -400 -9 3 -183 157 -522 461
l-188 168 0 440 c0 241 3 439 7 439 5 0 167 -159 360 -352z"
                  />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white dark:bg-slate-950"
      aria-labelledby="footer-heading"
    >
      <p id="footer-heading" className="sr-only">
        weshipit.today
      </p>
      <div className="mx-auto max-w-7xl px-4 py-12 opacity-60 transition-opacity hover:opacity-100 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mb-6">
                <p className="text-base font-bold text-slate-900 dark:text-slate-200">
                  Resources
                </p>
                <ul className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <FooterLink {...item} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-slate-200">
                  Company
                </p>
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
            <p className="text-base font-bold text-slate-900 dark:text-slate-200">
              Are you looking to build a React Native app?
            </p>
            <p className="text-base leading-7 text-slate-400">
              Look no further than weshipit.today, the #1 destination for
              finding tools, discovering launch advices, and finding partners to
              successfully release your React Native app today.
            </p>
            <LinkButton href="/" size="xl">
              Work with us
            </LinkButton>
          </div>
        </div>
        <div className="my-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between dark:border-gray-800">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                title={item.name}
                href={item.href}
                className="text-slate-400 hover:text-slate-400"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="size-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-slate-400 md:order-1 md:mt-0">
            &copy; {fullYear} weshipit.today SASU, All rights reserved. <br />
            <Hyperlink
              href="https://www.pappers.fr/entreprise/weshipittoday-919243923"
              isExternal
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              SIRET 91924392300027
            </Hyperlink>
          </p>
        </div>
        <p className="text-base text-slate-400">
          Website 100% Over-engineered made with React,{' '}
          <Hyperlink
            href="https://design.weshipit.today/"
            isExternal
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Storybook
          </Hyperlink>
          , Next.js and Nx monorepo. You can hack the{' '}
          <Hyperlink
            href="https://github.com/flexbox/weshipit.today/"
            isExternal
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            source code source on GitHub
          </Hyperlink>
          .
        </p>
        <AISearch />
      </div>
    </footer>
  );
}

export default Footer;
