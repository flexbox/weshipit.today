import * as React from 'react';
import Prism from 'prismjs';

import GlobalStyles from '~/components/GlobalStyles';
import Markdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';

interface Props {
  children: any;
  escapeHtml?: boolean;
}

export default function MarkdownRenderer(props: Props) {
  const { children, ...rest } = props;

  React.useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <React.Fragment>
      <GlobalStyles.MarkdownStyles />
      <GlobalStyles.PrismStyles />
      <Markdown {...rest} rehypePlugins={[rehypeExternalLinks]}>
        {children}
      </Markdown>
    </React.Fragment>
  );
}
