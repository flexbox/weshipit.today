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
  let variantStyle;
  if (variant === 'secondary') {
    variantStyle = 'bg-white text-black hover:bg-gray-100';
  } else {
    variantStyle = 'bg-indigo-600 hover:bg-indigo-700 text-white';
  }
  return (
    <a
      href={href}
      target={'_blank'}
      className={`flex items-center justify-between rounded-md  py-3 text-base  font-medium  shadow-md  md:px-6 md:text-lg ${style} ${variantStyle}`}
      rel="noreferrer"
    >
      {accessoryLeft && <div className="flex">{accessoryLeft}</div>}
      {children}
    </a>
  );
}

export default Button;
