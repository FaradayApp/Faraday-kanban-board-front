import styles from './TaskCommentCard.module.scss';
import { Avatar, EditIcon, Text, TrashIcon } from '@/shared/ui-kit';

type TaskCommentCardProps = {
  name: string;
  date: string;
  message: string;
  avatar?: string;
};

export const TaskCommentCard = (props: TaskCommentCardProps) => {
  const { name, avatar, message, date } = props;

  return (
    <div className={styles.commentCard}>
      <header className={styles.commentCard__title}>
        <Avatar src={avatar} size={16} />
        <Text tag='span' size='xsm'>
          {name}
        </Text>
      </header>

      <div className={styles.commentCard__body}>
        <Text tag='p' size='md' weight='regular'>
          {message}
        </Text>
      </div>

      <footer className={styles.commentCard__footer}>
        <Text tag='span' size='xsm' weight='light'>
          {date}
        </Text>
        <div className={styles.commentCard__controls}>
          <EditIcon />
          <TrashIcon />
        </div>
      </footer>
    </div>
  );
};
