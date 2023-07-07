import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { PageContainer } from '@/shared/ui-kit';
import { TaskCreateForm, TaskPageHeader } from '@/widgets/task';

export const TaskCreatePage = observer(() => {
  const { t } = useTranslation();

  return (
    <PageContainer header={<TaskPageHeader title={t('taskEdit.titles.create')} />}>
      <TaskCreateForm />
    </PageContainer>
  );
});
