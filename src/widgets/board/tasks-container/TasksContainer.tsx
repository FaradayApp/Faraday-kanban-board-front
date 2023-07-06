import { PropsWithChildren, ReactNode } from 'react';

import styles from './TasksContainer.module.scss';
import { Heading } from '@/shared/ui-kit';

type TasksContainerProps = PropsWithChildren<{
  title: string;
  control?: ReactNode;
}>;

export const TasksContainer = (props: TasksContainerProps) => {
  const { title, control, children } = props;

  return (
    <article className={styles.tasksContainer}>
      <header className={styles.tasksContainer__header}>
        <Heading tag='h3' size='xsm' weight='bold' children={title} />
        {control}
      </header>

      <div className={styles.tasksContainer__list}>{children}</div>
    </article>
  );
};
