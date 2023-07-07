import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import styles from './TaskInfoForm.module.scss';
import {
  AvatarIcon,
  Button,
  FloatingSelect,
  FloatingTextArea,
  Heading,
  PriorityTag,
  Text,
  withSymbolsCounter,
} from '@/shared/ui-kit';
import { tasksStore } from '@/stores';
import { UserComment, UserShortCard } from '@/enitities/user';
import { STATUS_OPTIONS, TaskStatus, getStatusValue } from '@/enitities/types';

const TextAreaWithCounter = withSymbolsCounter(FloatingTextArea);

export const TaskInfoForm = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();

  if (!id) return null;

  const task = tasksStore.getById(id);

  return (
    <div className={styles.taskInfoForm}>
      <div className={styles.taskInfoForm__title}>
        <Heading tag='h2' size='md'>
          {task.data.name}
        </Heading>
        <PriorityTag type={task.data.priority} />
      </div>

      <FloatingSelect
        label={t('taskEdit.labels.status')}
        options={STATUS_OPTIONS}
        value={getStatusValue(task.data.status)}
        onChange={(option) => task.changeStatus(option?.value as TaskStatus)}
      />

      <div className={styles.taskInfoForm__info}>
        <div className={styles.taskInfoForm__dates}>
          <div className={styles.taskInfoForm__date}>
            <Heading tag='h3' size='xsm'>
              {t('task.dates.start')}
            </Heading>
            <Text tag='span' size='sm'>
              {task.data.dates.start}
            </Text>
          </div>
          <div className={styles.taskInfoForm__date}>
            <Heading tag='h3' size='xsm'>
              {t('task.dates.end')}
            </Heading>
            <Text tag='span' size='sm'>
              {task.data.dates.end}
            </Text>
          </div>
        </div>

        <div className={styles.taskInfoForm__users}>
          <Heading tag='h3' size='xsm'>
            {t('task.producer')}
          </Heading>
          <UserShortCard userId={task.data.producer} />
        </div>

        {task.data.workers.length > 0 && (
          <div className={styles.taskInfoForm__users}>
            <Heading tag='h3' size='xsm'>
              {t('task.workers')}
            </Heading>
            {task.data.workers.map((id) => (
              <UserShortCard key={id} userId={id} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.taskInfoForm__br} />

      <TextAreaWithCounter
        value={task.data.description}
        label={t('taskEdit.labels.description')}
        maxSymbols={1000}
        onChange={(event) => task.changeDescription(event?.target.value)}
      />

      <div className={styles.taskInfoForm__newComment}>
        <AvatarIcon width={30} height={30} className={styles.taskInfoForm__newCommentAvatar} />
        <TextAreaWithCounter label={t('task.labels.comment')} maxSymbols={60} />
      </div>

      <UserComment
        date={'06.01.2023'}
        name='Борис Васильев1'
        message='Название задачи Описание По умолчанию отображается тот текущий и еще информация различная по задаче'
      />
      <UserComment
        date={'06.01.2023'}
        name='Борис Васильев2'
        message='Название задачи Описание По умолчанию отображается '
      />

      <Button>{t('task.buttons.save')}</Button>
    </div>
  );
});
