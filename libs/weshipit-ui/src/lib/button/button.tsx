/* eslint-disable-next-line */

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  accessoryLeft?: React.ReactNode;
  children?: React.ReactNode;
  style?: string;
  href: string;
}

export function Button({
  variant,
  accessoryLeft,
  children,
  style,
  href,
}: ButtonProps) {
  if (variant === 'secondary') {
    return (
      <a
        href={href}
        target={'_blank'}
        className={`flex items-center justify-between rounded-md bg-white py-3 text-base  font-medium text-black shadow-md hover:bg-gray-100 md:px-6 md:text-lg ${style}`}
        rel="noreferrer"
      >
        {accessoryLeft && <div className="flex">{accessoryLeft}</div>}
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      target={'_blank'}
      className={`flex items-center justify-between rounded-md border border-transparent bg-indigo-600 py-3 text-base font-medium text-white shadow-md hover:bg-indigo-700  md:px-6 md:text-lg ${style}`}
      rel="noreferrer"
    >
      {accessoryLeft && <div className="flex">{accessoryLeft}</div>}
      {children}
    </a>
  );
}

export default Button;
