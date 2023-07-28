import { ReactNode } from 'react';

import styles from './UserShortCard.module.scss';
import { Avatar, Text } from '@/shared/ui-kit';

type UserShortCardProps = {
  name: string;
  avatar: string;
  controls?: ReactNode;
};

export const UserShortCard = (props: UserShortCardProps) => {
  const { name, avatar, controls } = props;

  return (
    <div className={styles.userShortCard}>
      <Avatar size={30} src={avatar} />
      <Text tag='span' size='sm'>
        {name}
      </Text>
      {controls && <div className={styles.userShortCard__controls}>{controls}</div>}
    </div>
  );
};
