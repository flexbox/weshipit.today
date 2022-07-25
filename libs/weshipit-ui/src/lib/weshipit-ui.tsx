import styles from './weshipit-ui.module.css';

/* eslint-disable-next-line */
export interface WeshipitUiProps {}

export function WeshipitUi(props: WeshipitUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WeshipitUi!</h1>
    </div>
  );
}

export default WeshipitUi;
