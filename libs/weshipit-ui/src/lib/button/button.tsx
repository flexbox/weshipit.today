import styles from './button.module.css';
import Gravatar from 'react-gravatar';
/* eslint-disable-next-line */

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export function Button(props: ButtonProps) {
  if (props.variant === 'secondary') {
    return (
      <div className="bg-blue-200">
        <Gravatar email="ducrocq.matthys@gmail.com" />
        Test
      </div>
    );
  }
  return <div className="bg-red-200">Test</div>;
}

export default Button;
