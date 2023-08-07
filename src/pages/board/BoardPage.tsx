import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type OnDragEndResponder,
} from 'react-beautiful-dnd';

import styles from './BoardPage.module.scss';
import { PageContainer } from '@/shared/ui-kit';
import { boardStore } from '@/stores/board/BoardStore';
import { BoardPageHeader, TaskCard, TasksContainer, TasksSort } from '@/widgets/board';
import { TaskStatus } from '@/enitities/task';
import clsx from 'clsx';

export const BoardPage = observer(() => {
  const { t } = useTranslation();

  const onTaskMove: OnDragEndResponder = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const taskId = Number.parseInt(draggableId);

    boardStore.moveTask({
      from: source.droppableId as TaskStatus,
      to: destination.droppableId as TaskStatus,
      at: destination.index,
      id: taskId,
    });
  };

  const getDraggedCardStyle = (isDragging: boolean) => {
    return clsx({
      [styles.boardPage__draggedCard]: isDragging,
    });
  };

  return (
    <PageContainer header={<BoardPageHeader />}>
      <DragDropContext onDragEnd={onTaskMove}>
        <div className={styles.boardPage__taskContainers}>
          {boardStore.columns.map(
            (columnStore) =>
              !columnStore.isEmpty && (
                <Droppable droppableId={columnStore.type} key={columnStore.type}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <TasksContainer
                        title={columnStore.type}
                        control={
                          <TasksSort
                            onSort={columnStore.sort}
                            selected={columnStore.options.sort}
                          />
                        }>
                        {columnStore.tasks.map((task, ind) => (
                          <Draggable key={task.id} draggableId={task.id.toString()} index={ind}>
                            {(provided, snapshot) => (
                              <div
                                key={task.id}
                                ref={provided.innerRef}
                                className={getDraggedCardStyle(snapshot.isDragging)}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <TaskCard {...task} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </TasksContainer>
                    </div>
                  )}
                </Droppable>
              )
          )}
          {boardStore.tasks.isRejected && (
            <div className={styles.boardPage__error}>{t('board.errors.load')}</div>
          )}
        </div>
      </DragDropContext>
    </PageContainer>
  );
});
