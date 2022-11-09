/* eslint-disable-next-line */
export interface TextProps {
  variant: 'h1' | 'h2' | 'h3' | 's1' | 's2' | 'p1' | 'p2';
  color?: string;
  children: React.ReactNode;
  style?: string;
}

export function Text({
  children,
  variant,
  style,
  color = 'text-gray-900',
}: TextProps) {
  if (variant === 'h1') {
    return (
      <h1
        className={`text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl ${style} ${color}`}
      >
        {children}
      </h1>
    );
  }
  if (variant === 'h2') {
    return (
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl ${style} ${color}`}
      >
        {children}
      </h2>
    );
  }
  if (variant === 'h3') {
    return (
      <h3
        className={`text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl ${style} ${color}`}
      >
        {children}
      </h3>
    );
  }
  if (variant === 's1') {
    return (
      <p
        className={`text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl ${style} ${color}`}
      >
        {children}
      </p>
    );
  }
  if (variant === 's2') {
    return (
      <p
        className={`text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl ${style} ${color}`}
      >
        {children}
      </p>
    );
  }
  if (variant === 'p1') {
    return (
      <p
        className={`text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl ${style} ${color}`}
      >
        {children}
      </p>
    );
  }
  if (variant === 'p2') {
    return (
      <p
        className={`text-sm font-medium sm:text-base md:text-lg lg:text-base xl:text-lg ${style} ${color}`}
      >
        {children}
      </p>
    );
  }
  return <p>{children}</p>;
}

export default Text;
