import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

export interface HyperlinkProps {
  href: string;
  text: string;
  isExternal?: boolean;
}

export function Hyperlink(props: HyperlinkProps) {
  const { text } = props;
  const isExternal = props.isExternal || false;

  if (isExternal) {
    return (
      <a target="_blank" rel="noopener noreferrer" {...props}>
        {text} <ArrowUpRightIcon />
      </a>
    );
  }

  return <a {...props}>{text}</a>;
}

export default Hyperlink;
