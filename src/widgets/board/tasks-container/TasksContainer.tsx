import { PropsWithChildren, ReactNode } from 'react';

import styles from './TasksContainer.module.scss';
import { Heading } from '@/shared/ui-kit';
import { use100vh } from 'react-div-100vh';

type TasksContainerProps = PropsWithChildren<{
  title: string;
  control?: ReactNode;
}>;

export const TasksContainer = (props: TasksContainerProps) => {
  const { title, control, children } = props;
  const vh = use100vh();

  return (
    <article className={styles.tasksContainer} style={{ maxHeight: vh ? vh - 120 : '80vh' }}>
      <header className={styles.tasksContainer__header}>
        <Heading tag='h3' size='xsm' weight='bold' children={title} />
        {control}
      </header>

      <div className={styles.tasksContainer__list}>{children}</div>
    </article>
  );
};
