import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/** Shared look of text inputs, textareas and selects. */
export const fieldVariants = cva(
  [
    'w-full',
    'rounded-md',
    'border-0',
    'bg-white',
    'text-slate-900',
    'ring-1',
    'ring-inset',
    'ring-slate-300',
    'placeholder:text-slate-400',
    'focus:ring-2',
    'focus:ring-inset',
    'focus:ring-blue-600',
    'aria-invalid:ring-red-500',
    'dark:bg-white/5',
    'dark:text-white',
    'dark:ring-white/10',
    'dark:aria-invalid:ring-red-400',
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

/** Text input. Set `aria-invalid` to show the error ring. */
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
