import { observer } from 'mobx-react-lite';

import styles from './BoardPage.module.scss';
import { boardStore } from '@/stores';
import { PageContainer } from '@/shared/ui-kit';
import { BoardPageHeader, TaskCard, TasksContainer, TasksSort } from '@/widgets/board';

export const BoardPage = observer(() => {
  return (
    <PageContainer header={<BoardPageHeader />}>
      <div className={styles.boardPage__taskContainers}>
        {boardStore.columns.map((column) => (
          <TasksContainer
            key={column.id}
            title={column.status}
            control={<TasksSort onSort={(sortType) => column.sortTasks(sortType)} />}>
            {column.tasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </TasksContainer>
        ))}
      </div>
    </PageContainer>
  );
});
