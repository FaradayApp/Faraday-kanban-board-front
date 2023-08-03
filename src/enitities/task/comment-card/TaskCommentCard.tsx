import { type ReactNode } from 'react';

import styles from './TaskCommentCard.module.scss';
import { Avatar, Text } from '@/shared/ui-kit';
import { TaskComment } from '../task.types';

type TaskCommentCardProps = {
  comment: TaskComment;
  controls?: ReactNode;
};

export const TaskCommentCard = (props: TaskCommentCardProps) => {
  const { comment, controls } = props;
  const { user } = comment;

  return (
    <div className={styles.commentCard}>
      <header className={styles.commentCard__title}>
        <Avatar src={user.avatar} size={16} />
        <Text tag='span' size='xsm'>
          {user.first_name}
        </Text>
      </header>

      <div className={styles.commentCard__body}>
        <Text tag='p' size='md' weight='regular'>
          {comment.text}
        </Text>
      </div>

      <footer className={styles.commentCard__footer}>
        <Text tag='span' size='xsm' weight='light'>
          {comment.created_at.format('DD.MM.YYYY')}
        </Text>
        <div className={styles.commentCard__controls}>{controls}</div>
      </footer>
    </div>
  );
};
