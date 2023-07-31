import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './BoardPage.module.scss';
import { PageContainer } from '@/shared/ui-kit';
import { boardStore } from '@/stores/board/BoardStore';
import { BoardPageHeader, TaskCard, TasksContainer, TasksSort } from '@/widgets/board';

export const BoardPage = observer(() => {
  useEffect(() => {
    boardStore.init();
  }, []);

  return (
    <PageContainer header={<BoardPageHeader />}>
      <div className={styles.boardPage__taskContainers}>
        {boardStore.columns.map(
          (columnStore) =>
            !columnStore.isEmpty && (
              <TasksContainer
                key={columnStore.title}
                title={columnStore.title}
                control={
                  <TasksSort onSort={columnStore.sort} selected={columnStore.options.sort} />
                }>
                {columnStore.tasks.map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
              </TasksContainer>
            )
        )}
      </div>
    </PageContainer>
  );
});
