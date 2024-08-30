import Link, { LinkProps } from 'next/link';
import { buttonVariants } from './button';
import { VariantProps } from 'class-variance-authority';

export interface LinkButtonProps
  extends VariantProps<typeof buttonVariants>,
    LinkProps {
  className?: string;
  children: React.ReactNode;
}

export function LinkButton({
  children,
  className,
  size,
  variant,
  ...rest
}: LinkButtonProps) {
  return (
    <Link className={buttonVariants({ className, size, variant })} {...rest}>
      {children}
    </Link>
  );
}

export default LinkButton;
