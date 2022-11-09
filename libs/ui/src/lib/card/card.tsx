export interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="m-12 rounded-lg border-2 border-white bg-slate-100 hover:border-black">
      {children}
    </div>
  );
}

export default Card;
