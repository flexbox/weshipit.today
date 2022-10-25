/* eslint-disable-next-line */
export interface TextProps {
  variant: 'h1' | 'h2' | 'h3' | 's1' | 's2' | 'p1' | 'p2';
  children: React.ReactNode;
  style?: string;
}

export function Text({ children, variant, style }: TextProps) {
  if (variant === 'h1') {
    return (
      <h1
        className={`text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl ${style}`}
      >
        {children}
      </h1>
    );
  }
  if (variant === 'h2') {
    return (
      <h2
        className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl ${style}`}
      >
        {children}
      </h2>
    );
  }
  if (variant === 'h3') {
    return (
      <h3
        className={`text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl ${style}`}
      >
        {children}
      </h3>
    );
  }
  if (variant === 's1') {
    return (
      <p
        className={`text-xl text-gray-900 sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl ${style}`}
      >
        {children}
      </p>
    );
  }
  if (variant === 's2') {
    return (
      <p
        className={`text-lg text-gray-900 sm:text-xl md:text-2xl lg:text-xl xl:text-2xl ${style}`}
      >
        {children}
      </p>
    );
  }
  if (variant === 'p1') {
    return (
      <p
        className={`text-base text-gray-900 sm:text-lg md:text-xl lg:text-lg xl:text-xl ${style}`}
      >
        {children}
      </p>
    );
  }
  if (variant === 'p2') {
    return (
      <p
        className={`text-sm font-medium text-gray-900 sm:text-base md:text-lg lg:text-base xl:text-lg ${style}`}
      >
        {children}
      </p>
    );
  }
  return <p>{children}</p>;
}

export default Text;
