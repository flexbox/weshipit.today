/* eslint-disable-next-line */

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  accessoryLeft?: React.ReactNode;
  text: string;
}

export function Button(props: ButtonProps) {
  if (props.variant === 'secondary') {
    return (
      <a
        href="https://airtable.com/shrkRxhdc2zJD8EM5"
        target={'_blank'}
        className=" mx-3 flex items-center justify-between rounded-md bg-white py-3 text-base  font-medium text-black shadow-md hover:bg-gray-200 md:px-6 md:text-lg"
        rel="noreferrer"
      >
        {props.accessoryLeft && (
          <div className="flex">{props.accessoryLeft}</div>
        )}
        {props.text}
      </a>
    );
  }
  return (
    <a
      href="https://airtable.com/shrkRxhdc2zJD8EM5"
      target={'_blank'}
      className="flex items-center justify-between rounded-md border border-transparent bg-indigo-600 py-3 text-base font-medium text-white shadow-md hover:bg-indigo-700  md:px-6 md:text-lg"
      rel="noreferrer"
    >
      {props.accessoryLeft && <div className="flex">{props.accessoryLeft}</div>}
      {props.text}
    </a>
  );
}

export default Button;
