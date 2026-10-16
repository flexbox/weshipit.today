import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
  className?: string;
  as?: React.ElementType;
}

export function Container({
  as: Component = 'div',
  children,
  className,
}: ContainerProps) {
  return (
    <Component className={clsx('mx-auto max-w-7xl px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </Component>
  );
}
