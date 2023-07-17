export interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="rounded-xl border-2 border-transparent bg-white p-6 transition hover:border-slate-300 dark:bg-slate-900 dark:hover:border-slate-600">
      {children}
    </div>
  );
}

export default Card;
