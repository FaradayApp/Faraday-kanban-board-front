import styles from './UserComment.module.scss';
import { Avatar, EditIcon, Text, TrashIcon } from '@/shared/ui-kit';

type UserCommentProps = {
  name: string;
  date: string;
  message: string;
  avatar?: string;
};

export const UserComment = (props: UserCommentProps) => {
  const { name, avatar, message, date } = props;

  return (
    <div className={styles.userComment}>
      <header className={styles.userComment__title}>
        <Avatar src={avatar} size={16} />
        <Text tag='span' size='xsm'>
          {name}
        </Text>
      </header>

      <div className={styles.userComment__body}>
        <Text tag='p' size='md' weight='regular'>
          {message}
        </Text>
      </div>

      <footer className={styles.userComment__footer}>
        <Text tag='span' size='xsm' weight='light'>
          {date}
        </Text>
        <div className={styles.userComment__controls}>
          <EditIcon />
          <TrashIcon />
        </div>
      </footer>
    </div>
  );
};
