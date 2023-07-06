import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';

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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type TaskCardProps = {
  id: string;
  title: string;
  date: string;
  workers: { avatar: string }[];
  priority: 'hight' | 'medium' | 'low';
  comments: number;
};

export const TaskCard = observer((props: TaskCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, title, date, workers, priority, comments } = props;

  const selectedUsers = workers?.slice(0, 3) ?? [];
  const formattedDate = dayjs(date).format('DD MMM');

  const openTaskInfo = () => {
    navigate(`/task/${id}`);
  };

  const Users = selectedUsers.map((user, i) => (
    <div key={user.avatar} style={{ position: 'absolute', left: `${14 * i}px` }}>
      <Avatar size={20} src={user.avatar} />
    </div>
  ));

  const Comments = comments ? (
    <div className={styles.taskCard__controls}>
      <MenuIcon />
      <div className={styles.taskCard__controlsComments}>
        <Text tag='span' size='xsm' children={comments} />
        <CommentIcon />
      </div>
    </div>
  ) : null;

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
          <PriorityTag type={priority} />
        </div>
        <DateTag date={formattedDate} />
      </div>
      <footer className={styles.taskCard__footer}>
        <div className={styles.taskCard__workers}>{Users}</div>
        {Comments}
      </footer>
    </article>
  );
});
