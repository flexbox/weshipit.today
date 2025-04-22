import Link, { LinkProps } from 'next/link';
import { buttonVariants } from './button';
import { VariantProps } from 'class-variance-authority';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';

export interface LinkButtonProps
  extends VariantProps<typeof buttonVariants>,
    LinkProps {
  className?: string;
  children: React.ReactNode;
  isExternalLink?: boolean;
  withExternalLinkIcon?: boolean;
}

export function LinkButton({
  children,
  className,
  size,
  variant,
  isExternalLink = false,
  withExternalLinkIcon = false,
  ...rest
}: LinkButtonProps) {
  if (isExternalLink) {
    return (
      <Link
        className={buttonVariants({ className, size, variant })}
        target="_blank"
        {...rest}
      >
        <div className="flex">
          {children}

          {withExternalLinkIcon && (
            <ArrowTopRightOnSquareIcon
              className="-mr-0.5 ml-1 size-5 opacity-40"
              aria-hidden="true"
            />
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link className={buttonVariants({ className, size, variant })} {...rest}>
      {children}
    </Link>
  );
}

export default LinkButton;
