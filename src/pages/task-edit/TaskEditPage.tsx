import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PageContainer, PageHeader } from '@/shared/ui-kit';
import { type TaskInfo } from '@/enitities/task';
import { boardStore } from '@/stores/board';
import { taskInfoStore } from '@/stores/task-info';
import { editTaskInfo, deleteTask as deleteTaskFeature } from '@/features/tasks';
import { TaskEditForm } from '@/widgets/task';

export const TaskEditPage = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id, boardUuid } = useParams();
  const taskId = Number.parseInt(id || "");

  const editTask = useCallback(
    async (data: Partial<TaskInfo>) => {
      if (taskId) {
        await editTaskInfo(boardStore, taskInfoStore, taskId)(data);
        navigate(`/board/${boardUuid}/task/${taskId}`);
      }
    },
    [boardUuid, navigate, taskId]
  );

  const deleteTask = useCallback(() => {
    if (taskId) {
      deleteTaskFeature(taskId, navigate);
    }
  }, [navigate, taskId]);

  const data = taskInfoStore.taskInfo.data || null;

  return (
    <PageContainer
      loading={taskInfoStore.taskInfo.isPending}
      header={<PageHeader title={t('taskEdit.titles.edit')} />}
    >
      {data && <TaskEditForm task={data} editTask={editTask} deleteTask={deleteTask} />}
    </PageContainer>
  );
});
