import Link, { LinkProps } from 'next/link';
import { buttonVariants } from './button';
import { VariantProps } from 'class-variance-authority';

export interface LinkButtonProps
  extends VariantProps<typeof buttonVariants>,
    LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function LinkButton({
  children,
  variant,
  size,
  className,
  ...rest
}: LinkButtonProps) {
  return (
    <Link className={buttonVariants({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

export default LinkButton;
