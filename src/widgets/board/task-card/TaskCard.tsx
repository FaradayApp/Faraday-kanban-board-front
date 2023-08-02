import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './TaskCard.module.scss';
import {
  Heading,
  Text,
  CommentIcon,
  MenuIcon,
  DateTag,
  PriorityTag,
  Avatar,
} from '@/shared/ui-kit';
import { Task } from '@/enitities/task';

export const TaskCard = observer((props: Task) => {
  const { id, title, priority, performers, expiration_date, comments_count } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const users = performers?.slice(0, 3) ?? [];
  const formattedDate = expiration_date.format('DD MMM');

  const openTaskInfo = () => {
    navigate(`task/${id}`);
  };

  return (
    <article className={styles.taskCard} onClick={openTaskInfo}>
      <Heading tag='h3' size='sm' weight='bold' className={styles.taskCard__title}>
        {title}
      </Heading>
      <div className={styles.taskCard__content}>
        <div className={styles.taskCard__priority}>
          <Text tag='span' size='xsm' weight='light'>
            {t('task.priority.label')}
          </Text>
          <PriorityTag type={priority.type} />
        </div>
        <DateTag date={formattedDate} />
      </div>
      <footer className={styles.taskCard__footer}>
        <div className={styles.taskCard__workers}>
          {users.map((user, i) => (
            <div key={user.id} style={{ position: 'absolute', left: `${14 * i}px` }}>
              <Avatar size={20} src={user.avatar} />
            </div>
          ))}
        </div>
        {!!comments_count && (
          <div className={styles.taskCard__controls}>
            <MenuIcon />
            <div className={styles.taskCard__controlsComments}>
              <Text tag='span' size='xsm'>
                {comments_count}
              </Text>
              <CommentIcon />
            </div>
          </div>
        )}
      </footer>
    </article>
  );
});
