import { PropsWithChildren, ReactNode } from 'react';

import styles from './PageContainer.module.scss';
import { Loader } from '../..';
import clsx from 'clsx';

type PageContainerProps = PropsWithChildren<{
  header?: ReactNode;
  loading?: boolean;
  limited?: boolean;
}>;

export const PageContainer = (props: PageContainerProps) => {
  const { children, header, loading, limited = true } = props;

  const bodyClasses = clsx(styles.container__body, {
    [styles.container__body_limited]: limited,
  });

  return (
    <main className={styles.container}>
      {header && <header className={styles.container__header}>{header}</header>}
      {loading ? (
        <div className={styles.container__loader}>
          <Loader />
        </div>
      ) : (
        <div className={bodyClasses}>{children}</div>
      )}
    </main>
  );
};
