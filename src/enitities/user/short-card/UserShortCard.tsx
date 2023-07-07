import { ReactNode } from 'react';

import styles from './UserShortCard.module.scss';
import { Avatar, Text } from '@/shared/ui-kit';
import { usersStore } from '@/stores/Users';

type UserShortCardProps = {
  userId: UserId;
  controls?: ReactNode;
};

export const UserShortCard = (props: UserShortCardProps) => {
  const { userId, controls } = props;

  const user = usersStore.getById(userId);

  return (
    <div className={styles.userShortCard}>
      <Avatar size={30} src={user.avatar} />
      <Text tag='span' size='sm'>
        {user.name}
      </Text>
      {controls && <div className={styles.userShortCard__controls}>{controls}</div>}
    </div>
  );
};
