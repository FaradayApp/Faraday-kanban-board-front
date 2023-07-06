import { ReactNode } from 'react';

import styles from './UserShortCard.module.scss';
import { AvatarIcon, Text } from '@/shared/ui-kit';

type UserShortCardProps = {
  name: string;
  controls?: ReactNode;
};

export const UserShortCard = (props: UserShortCardProps) => {
  const { name, controls } = props;

  return (
    <div className={styles.userShortCard}>
      <AvatarIcon width={30} height={30} />
      <Text tag='span' size='sm'>
        {name}
      </Text>
      {controls && <div className={styles.userShortCard__controls}>{controls}</div>}
    </div>
  );
};
