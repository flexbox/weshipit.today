export interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="rounded-xl bg-white p-6 ring-2 ring-transparent transition hover:ring-slate-300 dark:bg-slate-900 dark:hover:ring-slate-600">
      {children}
    </div>
  );
}

export default Card;
