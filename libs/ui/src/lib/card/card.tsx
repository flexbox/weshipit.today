export interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="rounded-lg border-2 border-transparent bg-slate-100 hover:border-black">
      {children}
    </div>
  );
}

export default Card;
