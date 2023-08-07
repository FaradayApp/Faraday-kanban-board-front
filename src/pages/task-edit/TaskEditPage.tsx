import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PageContainer, PageHeader } from '@/shared/ui-kit';
import { type TaskInfo } from '@/enitities/task';
import { boardStore } from '@/stores/board';
import { taskInfoStore } from '@/stores/task-info';
import { editTaskInfo } from '@/features/tasks';
import { TaskEditForm } from '@/widgets/task';

export const TaskEditPage = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();

  const editTask = useCallback(
    (data: Partial<TaskInfo>) => {
      if (id) {
        const taskId = Number.parseInt(id);
        editTaskInfo(boardStore, taskInfoStore, taskId)(data);
      }
    },
    [id]
  );

  const data = taskInfoStore.taskInfo.data || null;

  return (
    <PageContainer
      loading={taskInfoStore.taskInfo.isPending}
      header={<PageHeader title={t('taskEdit.titles.edit')} />}>
      {data && <TaskEditForm task={data} editTask={editTask} />}
    </PageContainer>
  );
});
