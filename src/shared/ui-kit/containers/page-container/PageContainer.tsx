import { PropsWithChildren, ReactNode } from 'react';

import styles from './PageContainer.module.scss';

type PageContainerProps = PropsWithChildren<{
  header?: ReactNode;
}>;

export const PageContainer = (props: PageContainerProps) => {
  const { children, header } = props;

  return (
    <main className={styles.container} >
      {header && <header className={styles.container__header}>{header}</header>}
      <div className={styles.container__body}>{children}</div>
    </main>
  );
};
