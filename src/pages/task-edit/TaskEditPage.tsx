import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PageContainer } from '@/shared/ui-kit';
import { type TaskInfo } from '@/enitities/task';
import { boardStore } from '@/stores/board';
import { taskInfoStore } from '@/stores/task-info';
import { editTaskInfo } from '@/features/tasks';
import { TaskEditForm, TaskPageHeader } from '@/widgets/task';

export const TaskEditPage = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();

  const editTask = useCallback(
    (data: Partial<TaskInfo>) => {
      if (id) {
        editTaskInfo(boardStore, taskInfoStore, id)(data);
      }
    },
    [id]
  );

  const data = taskInfoStore.taskInfo.data || null;

  return (
    <PageContainer header={<TaskPageHeader title={t('taskEdit.titles.edit')} />}>
      {data && <TaskEditForm task={data} editTask={editTask} />}
    </PageContainer>
  );
});
