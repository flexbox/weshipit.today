import { createGlobalStyle } from 'styled-components';
import { p } from '~/components/Typography';
import defaultTheme from '~/components/Theme';

const GlobalMarkdownStyles = createGlobalStyle`
  .embed {
    position: relative;
    padding-top: 56.25%;
    margin: ${defaultTheme.space[4]} 0;

    iframe {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  hr {
    width: 100%;
    height: 1px;
    background: ${(props) => props.theme.border.default};
    margin: ${defaultTheme.space[6]} 0;
  }

  table {
    min-width: 100%;
    width: 100%;
    max-width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    margin: ${defaultTheme.space[5]} 0;
    table-layout: fixed;
    white-space: nowrap;

    tbody {
      min-width: 100%;
      display: block;
      overflow: auto;
      width: 100%;
      max-width: 100%;
      width: -webkit-fit-content;
    }

    th {
      ${p};
      font-weight: ${defaultTheme.fontWeights.bold} !important;
      text-align: left;
      padding: ${defaultTheme.space[2]};
    }

    td {
      ${p};
      padding: ${defaultTheme.space[2]};
      vertical-align: top;
      border-top: 1px solid ${(props) => props.theme.border.default};
      text-overflow: ellipsis;
      width: 100%;
    }

    thead th {
      vertical-align: bottom;
      border-bottom: 1px solid ${(props) => props.theme.border.default};
    }
  }
`;

export default GlobalMarkdownStyles;
