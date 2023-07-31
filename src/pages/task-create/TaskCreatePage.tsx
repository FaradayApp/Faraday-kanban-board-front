import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { PageContainer } from '@/shared/ui-kit';
import { type NewTask } from '@/enitities/task';
import { boardStore } from '@/stores/board';
import { addNewTask } from '@/features/tasks';
import { TaskCreateForm, TaskPageHeader } from '@/widgets/task';

export const TaskCreatePage = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const addTask = useCallback(
    (newTask: NewTask) => addNewTask(boardStore, navigate)(newTask),
    [navigate]
  );

  return (
    <PageContainer header={<TaskPageHeader title={t('taskEdit.titles.create')} />}>
      <TaskCreateForm addTask={addTask} />
    </PageContainer>
  );
});
