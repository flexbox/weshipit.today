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
    return <h1 className={` ${style} ${color}`}>{children}</h1>;
  }
  if (variant === 'h2') {
    return <h2 className={`${style} ${color}`}>{children}</h2>;
  }
  if (variant === 'h3') {
    return <h3 className={`${style} ${color}`}>{children}</h3>;
  }
  if (variant === 's1') {
    return <p className={` ${style} ${color}`}>{children}</p>;
  }
  if (variant === 's2') {
    return <p className={` ${style} ${color}`}>{children}</p>;
  }
  if (variant === 'p1') {
    return <p className={` ${style} ${color}`}>{children}</p>;
  }
  if (variant === 'p2') {
    return <p className={`${style} ${color}`}>{children}</p>;
  }
  return <p>{children}</p>;
}

export default Text;
