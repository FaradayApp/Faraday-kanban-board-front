import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { PageContainer, PageHeader } from '@/shared/ui-kit';
import { type NewTask } from '@/enitities/task';
import { boardStore } from '@/stores/board';
import { addNewTask } from '@/features/tasks';
import { TaskCreateForm } from '@/widgets/task';
import { useOpenBoardPage } from '@/features/navigation';

export const TaskCreatePage = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openBoardPage } = useOpenBoardPage();

  const addTask = useCallback(
    (newTask: NewTask) => addNewTask(boardStore, navigate)(newTask),
    [navigate]
  );

  return (
    <PageContainer
      header={
        <PageHeader 
          title={t('taskEdit.titles.create')}
          navigationFn={openBoardPage}
        />
      }>
      <TaskCreateForm addTask={addTask} />
    </PageContainer>
  );
});
