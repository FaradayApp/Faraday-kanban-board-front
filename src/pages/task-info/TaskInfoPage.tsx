import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PageContainer } from '@/shared/ui-kit';
import { taskInfoStore } from '@/stores/task-info';
import { TaskInfoForm, TaskPageHeader } from '@/widgets/task';

export const TaskInfoPage = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      taskInfoStore.init(id);
    }
  }, [id]);

  const data = taskInfoStore.taskInfo.data || null;

  return (
    <PageContainer header={<TaskPageHeader title={t('task.title')} />}>
      {data && <TaskInfoForm task={data} />}
    </PageContainer>
  );
});
