import { ReactNode } from 'react';

import styles from './UserShortCard.module.scss';
import { Avatar, Text } from '@/shared/ui-kit';
import { User } from '../user.types';

type UserShortCardProps = {
  user: User;
  controls?: ReactNode;
};

export const UserShortCard = (props: UserShortCardProps) => {
  const { user, controls } = props;

  return (
    <div className={styles.userShortCard}>
      <Avatar size={30} src={user.avatar} />
      <Text tag='span' size='sm'>
        {user.first_name}
      </Text>
      {controls && <div className={styles.userShortCard__controls}>{controls}</div>}
    </div>
  );
};
