import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatingSelect } from '@/shared/ui-kit';
import { TaskPriority } from '../task.types';

type Option = { label: string; value: TaskPriority };
type TaskPrioritySelectProps = {
  value: TaskPriority | null;
  onChange: (option: TaskPriority) => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

export const TaskPrioritySelect = (props: TaskPrioritySelectProps) => {
  const { value, onChange, isInvalid, errorMessage } = props;
  const { t } = useTranslation();

  const options: Option[] = useMemo(
    () => [
      { label: t('task.priority.level.high'), value: 'HIGH' },
      { label: t('task.priority.level.medium'), value: 'MEDIUM' },
      { label: t('task.priority.level.low'), value: 'LOW' },
    ],
    [t]
  );

  return (
    <FloatingSelect<Option>
      label={t('task.status.label')}
      options={options}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    />
  );
};
