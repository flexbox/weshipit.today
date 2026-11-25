import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Shared look of text inputs, textareas and selects. The edge is an inset
 * outline, not a ring: forced-colors mode drops box-shadow but keeps outlines.
 */
export const fieldVariants = cva(
  [
    'w-full',
    'rounded-md',
    'bg-white',
    'text-slate-900',
    'outline-1',
    '-outline-offset-1',
    'outline-slate-300',
    'placeholder:text-slate-400',
    'focus:outline-2',
    'focus:-outline-offset-2',
    'focus:outline-blue-600',
    'aria-invalid:outline-red-500',
    'dark:bg-white/5',
    'dark:text-white',
    'dark:outline-white/10',
    'dark:aria-invalid:outline-red-400',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ],
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: {
        sm: ['px-2', 'py-1.5'],
        md: ['px-3', 'py-2'],
        lg: ['px-3.5', 'py-2.5', 'shadow-xs'],
      },
    },
  },
);

type FieldVariantProps = VariantProps<typeof fieldVariants>;

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>, FieldVariantProps {}

/** Text input. Set `aria-invalid` to show the red error outline. */
export function Input({ className, size, ...props }: InputProps) {
  return (
    <input className={cn(fieldVariants({ size }), className)} {...props} />
  );
}

export interface TextareaProps
  extends React.ComponentProps<'textarea'>, FieldVariantProps {}

export function Textarea({ className, size, ...props }: TextareaProps) {
  return (
    <textarea className={cn(fieldVariants({ size }), className)} {...props} />
  );
}

export interface SelectProps
  extends Omit<React.ComponentProps<'select'>, 'size'>, FieldVariantProps {}

export function Select({ className, size, ...props }: SelectProps) {
  return (
    <select className={cn(fieldVariants({ size }), className)} {...props} />
  );
}

export function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-slate-700 dark:text-slate-300',
        className,
      )}
      {...props}
    />
  );
}

/** Quiet aside inside a `<Label>`, like “(optional)”. */
export function LabelHint({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span className={cn('font-normal text-slate-400', className)} {...props} />
  );
}

/** Error under a field. Point the field's `aria-describedby` at its `id`. */
export function FieldError({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('mt-2 text-sm text-red-600 dark:text-red-400', className)}
      {...props}
    />
  );
}
