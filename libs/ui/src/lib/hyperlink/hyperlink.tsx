import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

export interface HyperlinkProps {
  href: string;
  text: string;
  isExternal?: boolean;
}

export function Hyperlink(props: HyperlinkProps) {
  const { href, text } = props;
  const isExternal = props.isExternal || false;
  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text} <ArrowUpRightIcon />
    </a>
  ) : (
    <a href={href}>{text}</a>
  );
}

export default Hyperlink;
