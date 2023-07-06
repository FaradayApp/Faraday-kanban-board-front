import clsx from 'clsx';

import styles from './PriorityTag.module.scss';
import { Text } from '@/shared/ui-kit/typography';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

type PriorityTagProps = {
  type: 'hight' | 'medium' | 'low';
};

export const PriorityTag = ({ type }: PriorityTagProps) => {
  const { t } = useTranslation();

  const classes = clsx(styles.priorityTag, {
    [styles.priorityTag_hight]: type === 'hight',
    [styles.priorityTag_medium]: type === 'medium',
    [styles.priorityTag_low]: type === 'low',
  });

  const text = useMemo(() => {
    switch (type) {
      case 'hight':
        return t('task.priority.level.hight');
      case 'medium':
        return t('task.priority.level.medium');
      case 'low':
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
