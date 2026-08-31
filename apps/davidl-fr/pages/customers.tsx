const CUSTOMERS = ['Gao', 'Ensemble Analytics', 'Klareo'] as const;

export default function Customers() {
  return (
    <div className="m-auto max-w-4xl px-6 py-24">
      <h1 className="mb-4 text-4xl font-bold">Customers</h1>
      <p className="mb-12 text-gray-600 dark:text-gray-400">Autumn 2025</p>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {CUSTOMERS.map((customer) => (
          <li
            key={customer}
            className="rounded-xl bg-white p-8 text-center text-lg font-semibold shadow-sm dark:bg-gray-900"
          >
            {customer}
          </li>
        ))}
      </ul>
    </div>
  );
}
