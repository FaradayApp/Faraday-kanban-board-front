import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import styles from './PriorityTag.module.scss';
import { Text } from '@/shared/ui-kit/typography';
import { TaskPriority } from '@/enitities/task';

type PriorityTagProps = {
  type: TaskPriority;
};

export const PriorityTag = (props: PriorityTagProps) => {
  const { type } = props;
  const { t } = useTranslation();

  const classes = clsx(styles.priorityTag, {
    [styles.priorityTag_high]: type === 'HIGH',
    [styles.priorityTag_medium]: type === 'MEDIUM',
    [styles.priorityTag_low]: type === 'LOW',
  });

  const text = useMemo(() => {
    switch (type) {
      case 'HIGH':
        return t('task.priority.level.high');
      case 'MEDIUM':
        return t('task.priority.level.medium');
      case 'LOW':
        return t('task.priority.level.low');
    }
  }, [t, type]);

  return (
    <div className={classes}>
      <Text tag='span' size='xsm' weight='light'>
        {text}
      </Text>
    </div>
  );
};
