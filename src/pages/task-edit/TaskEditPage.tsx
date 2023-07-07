import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { PageContainer } from '@/shared/ui-kit';
import { TaskEditForm, TaskPageHeader } from '@/widgets/task';

export const TaskEditPage = observer(() => {
  const { t } = useTranslation();

  return (
    <PageContainer header={<TaskPageHeader title={t('taskEdit.titles.edit')} />}>
      <TaskEditForm />
    </PageContainer>
  );
});
