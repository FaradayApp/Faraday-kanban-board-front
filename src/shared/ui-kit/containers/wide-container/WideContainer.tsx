import { PropsWithChildren } from 'react';
import styles from './WideContainer.module.scss';
import { use100vh } from 'react-div-100vh';

export const WideContainer = (props: PropsWithChildren) => {
  const height = use100vh();

  return (
    <div className={styles.wideContainer} style={{ minHeight: height || '100vh' }}>
      <div className={styles.wideContainer__content} {...props} />
    </div>
  );
};
