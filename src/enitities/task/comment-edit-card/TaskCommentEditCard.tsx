import { type ReactNode } from 'react';
import clsx from 'clsx';

import styles from './TaskCommentEditCard.module.scss';
import { Avatar, Text } from '@/shared/ui-kit';
import { User } from '@/enitities/user';

type TaskCommentEditCardProps = {
  user: User;
  message: string;
  maxLength: number;
  onChange: (value: string) => void;
  controls?: ReactNode;
  errorMessage?: string;
};

export const TaskCommentEditCard = (props: TaskCommentEditCardProps) => {
  const { user, message, maxLength, controls, errorMessage, onChange } = props;

  const cardClasses = clsx(styles.commentCard, {
    [styles.commentCard_error]: message.length > maxLength || !!errorMessage,
  });

  return (
    <div className={cardClasses}>
      <div className={styles.commentCard__body}>
        <header className={styles.commentCard__title}>
          <Avatar src={user.avatar} size={16} />
          <Text tag='span' size='xsm'>
            {user.first_name}
          </Text>
        </header>

        <textarea
          className={styles.commentCard__textarea}
          value={message}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
        />
      </div>

      <footer className={styles.commentCard__footer}>
        <Text tag='span' size='xsm' weight='light' className={styles.commentCard__counter}>
          {`${message.length}/${maxLength}`}
        </Text>
        <div className={styles.commentCard__controls}>{controls}</div>
      </footer>
    </div>
  );
};
