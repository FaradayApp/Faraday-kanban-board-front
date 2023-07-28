import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatingSelect } from '@/shared/ui-kit';
import { TaskStatus } from './task.types';

type Option = { label: string; value: TaskStatus };
type TaskStatusSelectProps = {
  value: TaskStatus | null;
  onChange: (option: TaskStatus) => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

export const TaskStatusSelect = (props: TaskStatusSelectProps) => {
  const { value, onChange, isInvalid, errorMessage } = props;
  const { t } = useTranslation();

  const options: Option[] = useMemo(
    () => [
      { label: t('task.status.backlog'), value: 'BACKLOG' },
      { label: t('task.status.todo'), value: 'TODO' },
      { label: t('task.status.in_progress'), value: 'IN_PROGRESS' },
      { label: t('task.status.done'), value: 'DONE' },
      { label: t('task.status.archive'), value: 'ARCHIVE' },
    ],
    [t]
  );

  return (
    <FloatingSelect
      label={t('taskEdit.labels.priority')}
      options={options}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    />
  );
};
