import { createGlobalStyle } from 'styled-components';
import defaultTheme from '~/components/Theme';

const ResetStyles = createGlobalStyle`
  :root { font-family: 'Inter', sans-serif; }

  @supports (font-variation-settings: normal) {
    :root { font-family: 'Inter var', sans-serif; }
  }

  html {
    display: flex;
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    font-size: 20px;
    line-height: ${defaultTheme.lineHeights.body};
    background-color: ${(props) => props.theme.bg.primary};
    color: ${(props) => props.theme.text.primary};
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    font-family: ${defaultTheme.fonts.body};
    -webkit-text-size-adjust: none;

    @media (max-width: ${defaultTheme.breakpoints[3]}) {
      font-size: 16px;
    }

    cursor: url("data:image/svg+xml,%3Csvg shape-rendering='geometricPrecision' xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none'%3E%3Cg filter='url(%23filter0_d)'%3E%3Cpath fill='%230070f3' d='M9.63 6.9a1 1 0 011.27-1.27l11.25 3.75a1 1 0 010 1.9l-4.68 1.56a1 1 0 00-.63.63l-1.56 4.68a1 1 0 01-1.9 0L9.63 6.9z'/%3E%3Cpath stroke='%23fff' stroke-width='1.5' d='M11.13 4.92a1.75 1.75 0 00-2.2 2.21l3.74 11.26a1.75 1.75 0 003.32 0l1.56-4.68a.25.25 0 01.16-.16L22.4 12a1.75 1.75 0 000-3.32L11.13 4.92z'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d' width='32.26' height='32.26' x='.08' y='.08' filterUnits='userSpaceOnUse'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='4'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0'/%3E%3CfeBlend in2='BackgroundImageFix' mode='normal' result='effect1_dropShadow'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow' mode='normal' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E") 6 2, default;
  }

  body {
    margin: 0;
    width: 100%;
    height: 100%;
  }

  @keyframes fadein-jsx-889353793{from{opacity:0;}to{opacity:1;}}

  #__next {
    height: 100%;
    animation-name: fadein-jsx-889353793;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
  }

  a {
    color: currentColor;
    text-decoration: none;
    background-color: transparent;
  }

  a:hover {
    cursor: pointer;
  }

  ::-moz-selection {
    /* Code for Firefox */
    background: ${(props) => props.theme.text.primary}!important;
    color: ${(props) => props.theme.text.onPrimary}!important;
  }

  ::selection {
    background: ${(props) => props.theme.text.primary}!important;
    color: ${(props) => props.theme.text.onPrimary}!important;
  }

  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: ${(props) => props.theme.text.placeholder};
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: ${(props) => props.theme.text.placeholder};
    opacity: 1;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: ${(props) => props.theme.text.placeholder};
    opacity: 1;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${(props) => props.theme.text.placeholder};
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: none;
    outline-offset: -2px;
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  audio {
    display: block;
    margin-top: 16px;
    width: 100%;
  }

  a {
    color: ${(props) => props.theme.text.primary};
  }

  a:hover button {
    text-decoration: none !important;
  }
`;

export default ResetStyles;
