import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { PageContainer } from '@/shared/ui-kit';
import { TaskInfoForm, TaskPageHeader } from '@/widgets/task';

export const TaskInfoPage = observer(() => {
  const { t } = useTranslation();

  return (
    <PageContainer header={<TaskPageHeader title={t('task.title')} />}>
      <TaskInfoForm />
    </PageContainer>
  );
});
