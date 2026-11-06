import React, { ReactNode } from 'react';

export const fieldClassName =
  'mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:focus:border-orange-400 dark:focus:ring-orange-400 dark:bg-gray-900 dark:text-gray-100';

export const choiceClassName = (isSelected: boolean) =>
  `flex cursor-pointer items-center justify-center rounded-md text-sm font-medium tabular-nums transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-500 dark:has-[:focus-visible]:ring-orange-400 ${
    isSelected
      ? 'bg-blue-600 text-white dark:bg-[#FF9500] dark:text-gray-950'
      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
  }`;

export const ratingScale = (min: number, max: number) =>
  Array.from({ length: max - min + 1 }, (_, index) => min + index);

interface RatingFieldProps {
  name: string;
  label: ReactNode;
  hint?: ReactNode;
  ratings: number[];
  value: number | null;
  onChange: (value: number) => void;
}

export const RatingField = ({
  hint,
  label,
  name,
  onChange,
  ratings,
  value,
}: RatingFieldProps) => (
  <fieldset className="mt-6">
    <legend className="font-semibold">{label}</legend>
    {hint && <p className="mt-1 text-gray-600 dark:text-gray-400">{hint}</p>}
    <div className="mt-2 flex flex-wrap gap-1">
      {ratings.map((rating) => (
        <label
          key={rating}
          className={`size-10 ${choiceClassName(value === rating)}`}
        >
          <input
            type="radio"
            name={name}
            value={rating}
            checked={value === rating}
            onChange={() => onChange(rating)}
            className="sr-only"
            required
          />
          {rating}
        </label>
      ))}
    </div>
  </fieldset>
);
