import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type OnDragEndResponder,
} from 'react-beautiful-dnd';
import clsx from 'clsx';

import styles from './BoardPage.module.scss';
import { PageContainer } from '@/shared/ui-kit';
import { Task, type TaskStatus } from '@/enitities/task';
import { boardStore, taskInfoStore } from '@/stores';
import { moveTask } from '@/features/tasks';
import { BoardPageHeader, TaskCard, TasksContainer, TasksSort } from '@/widgets/board';

type DraggableTasksList = {
  tasks: Task[];
};

const DraggableTasksList = observer((props: DraggableTasksList) => {
  const { tasks } = props;

  const getDraggedCardStyle = (isDragging: boolean) => {
    return clsx({
      [styles.boardPage__draggedCard]: isDragging,
    });
  };

  return tasks.map((task, ind) => (
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
  ));
});

export const BoardPage = observer(() => {
  const { t } = useTranslation();

  const onTaskMove: OnDragEndResponder = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const taskId = Number.parseInt(draggableId);

    moveTask(
      boardStore,
      taskInfoStore,
      taskId
    )({
      from: source.droppableId as TaskStatus,
      to: destination.droppableId as TaskStatus,
      at: destination.index,
      id: taskId,
    });
  };

  return (
    <PageContainer header={<BoardPageHeader />}>
      <DragDropContext onDragEnd={onTaskMove}>
        <div className={styles.boardPage__taskContainers}>
          {!boardStore.tasks.isRejected &&
            toJS(boardStore.columns).map((columnStore) => (
              <Droppable droppableId={columnStore.type} key={columnStore.type}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TasksContainer
                      title={t(`task.status.keys.${columnStore.type}`)}
                      control={
                        <TasksSort onSort={columnStore.sort} selected={columnStore.options.sort} />
                      }>
                      <DraggableTasksList tasks={columnStore.tasks} />
                    </TasksContainer>
                  </div>
                )}
              </Droppable>
            ))}

          {boardStore.tasks.isRejected && (
            <div className={styles.boardPage__error}>{t('board.errors.load')}</div>
          )}
        </div>
      </DragDropContext>
    </PageContainer>
  );
});
