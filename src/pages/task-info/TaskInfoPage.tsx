import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EditIcon, PageContainer } from '@/shared/ui-kit';
import { type TaskInfo } from '@/enitities/task';
import { boardStore } from '@/stores/board';
import { taskInfoStore } from '@/stores/task-info';
import { editTaskInfo } from '@/features/tasks';
import { TaskInfoForm, TaskPageHeader } from '@/widgets/task';

export const TaskInfoPage = observer(() => {
  const { t } = useTranslation();
  const { id, boardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && boardId) {
      taskInfoStore.init(id, boardId);
    }
  }, [id, boardId]);

  const editTask = useCallback(
    (data: Partial<TaskInfo>) => {
      if (id) {
        editTaskInfo(boardStore, id)(data);
      }
    },
    [id]
  );

  const openEditTaskPage = () => {
    navigate('edit');
  };

  const data = taskInfoStore.taskInfo.data || null;

  return (
    <PageContainer
      header={
        <TaskPageHeader 
          title={t('task.title')} 
          options={<EditIcon onClick={openEditTaskPage} />} 
        />
      }>
      {data && <TaskInfoForm task={data} editTask={editTask} />}
    </PageContainer>
  );
});
