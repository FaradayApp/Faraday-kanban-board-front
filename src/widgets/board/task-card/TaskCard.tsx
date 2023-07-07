import dayjs from 'dayjs';
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
import { usersStore, Task } from '@/stores';

type TaskCardProps = {
  task: Task;
};

export const TaskCard = observer(({ task }: TaskCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const selectedUsers = task.data.workers?.slice(0, 3) ?? [];
  const formattedDate = dayjs(task.data.dates.end, { format: 'DD.MM.YYYY' }).format('DD MMM');

  const openTaskInfo = () => {
    navigate(`/task/${task.data.id}`);
  };

  const Users = selectedUsers.map((id, i) => (
    <div key={id} style={{ position: 'absolute', left: `${14 * i}px` }}>
      <Avatar size={20} src={usersStore.getById(id).avatar} />
    </div>
  ));

  const Comments = task.data.comments ? (
    <div className={styles.taskCard__controls}>
      <MenuIcon />
      <div className={styles.taskCard__controlsComments}>
        <Text tag='span' size='xsm'>
          {task.data.comments.length}
        </Text>
        <CommentIcon />
      </div>
    </div>
  ) : null;

  return (
    <article className={styles.taskCard} onClick={openTaskInfo}>
      <Heading tag='h3' size='sm' weight='bold' className={styles.taskCard__title}>
        {task.data.name}
      </Heading>
      <div className={styles.taskCard__content}>
        <div className={styles.taskCard__priority}>
          <Text tag='span' size='xsm' weight='light'>
            {t('task.priority.label')}
          </Text>
          <PriorityTag type={task.data.priority} />
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
