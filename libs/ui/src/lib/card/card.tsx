export interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="rounded-xl border-2 border-transparent bg-white hover:border-black">
      {children}
    </div>
  );
}

export default Card;
