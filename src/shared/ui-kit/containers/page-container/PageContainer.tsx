import { PropsWithChildren, ReactNode } from 'react';

import styles from './PageContainer.module.scss';
import { Loader } from '../..';

type PageContainerProps = PropsWithChildren<{
  header?: ReactNode;
  loading?: boolean;
}>;

export const PageContainer = (props: PageContainerProps) => {
  const { children, header, loading } = props;

  return (
    <main className={styles.container}>
      {header && <header className={styles.container__header}>{header}</header>}
      {loading ? (
        <div className={styles.container__loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.container__body}>{children}</div>
      )}
    </main>
  );
};
