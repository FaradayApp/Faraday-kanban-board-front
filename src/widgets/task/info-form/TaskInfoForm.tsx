import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import styles from './TaskInfoForm.module.scss';
import {
  AvatarIcon,
  Button,
  Heading,
  PriorityTag,
  Text,
  TextAreaWithCounter,
} from '@/shared/ui-kit';
import { UserShortCard } from '@/enitities/user';
import { TaskStatusSelect, TaskInfo } from '@/enitities/task';

type TaskInfoFormProps = {
  task: TaskInfo;
};

export const TaskInfoForm = observer((props: TaskInfoFormProps) => {
  const { task } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.taskInfoForm}>
      <div className={styles.taskInfoForm__title}>
        <Heading tag='h2' size='md'>
          {task.title}
        </Heading>
        <PriorityTag type={task.priority} />
      </div>

      <TaskStatusSelect value={task.status} onChange={() => ({})} />

      <div className={styles.taskInfoForm__info}>
        <div className={styles.taskInfoForm__dates}>
          <div className={styles.taskInfoForm__date}>
            <Heading tag='h3' size='xsm'>
              {t('task.dates.start')}
            </Heading>
            <Text tag='span' size='sm'>
              {task.staging_date.format('DD.MM.YYYY')}
            </Text>
          </div>
          <div className={styles.taskInfoForm__date}>
            <Heading tag='h3' size='xsm'>
              {t('task.dates.end')}
            </Heading>
            <Text tag='span' size='sm'>
              {task.expiration_date.format('DD.MM.YYYY')}
            </Text>
          </div>
        </div>

        <div className={styles.taskInfoForm__users}>
          <Heading tag='h3' size='xsm'>
            {t('task.producer')}
          </Heading>
          <UserShortCard name={'name'} avatar={''} />
        </div>

        {task.performers.length > 0 && (
          <div className={styles.taskInfoForm__users}>
            <Heading tag='h3' size='xsm'>
              {t('task.workers')}
            </Heading>
            {task.performers.map((id) => (
              <UserShortCard key={id as string} name={'tst'} avatar={''} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.taskInfoForm__br} />

      <TextAreaWithCounter
        value={task.description}
        label={t('taskEdit.labels.description')}
        maxSymbols={1000}
        onChange={(event) => event?.target.value}
      />

      <div className={styles.taskInfoForm__newComment}>
        <AvatarIcon width={30} height={30} className={styles.taskInfoForm__newCommentAvatar} />
        <TextAreaWithCounter label={t('task.labels.comment')} maxSymbols={60} />
      </div>

      <Button>{t('task.buttons.save')}</Button>
    </div>
  );
});
