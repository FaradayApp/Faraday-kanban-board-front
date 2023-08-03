import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { TaskInfoSchema, taskInfoSchema } from './scheme';
import { TaskEditableComment } from '../comment/TaskEditableComment';

type TaskInfoFormProps = {
  task: TaskInfo;
  editTask: (task: Partial<TaskInfo>) => Promise<unknown>;
  deleteComment: (commentId: number) => Promise<unknown>;
  editComment: (commentId: number, message: string) => Promise<unknown>;
};

export const TaskInfoForm = observer((props: TaskInfoFormProps) => {
  const { task, editTask, deleteComment, editComment } = props;
  const { t } = useTranslation();

  const { handleSubmit, control, formState, resetField } = useForm<TaskInfoSchema>({
    resolver: zodResolver(taskInfoSchema),
  });
  const { errors, isSubmitting } = formState;
  const { status, description } = errors;

  const onSubmit: SubmitHandler<TaskInfoSchema> = async (data) => {
    await editTask(data);
    resetField('comment');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.taskInfoForm}>
      <div className={styles.taskInfoForm__title}>
        <Heading tag='h2' size='md'>
          {task.title}
        </Heading>
        <PriorityTag type={task.priority} />
      </div>

      <Controller
        name='status'
        control={control}
        defaultValue={task.status}
        render={({ field }) => (
          <TaskStatusSelect
            value={field.value}
            onChange={(option) => field.onChange(option)}
            errorMessage={status?.message}
          />
        )}
      />

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
          <UserShortCard user={task.producer} />
        </div>

        {task.performers.length > 0 && (
          <div className={styles.taskInfoForm__users}>
            <Heading tag='h3' size='xsm'>
              {t('task.workers')}
            </Heading>
            {task.performers.map((user) => (
              <UserShortCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.taskInfoForm__br} />

      <Controller
        name='description'
        control={control}
        defaultValue={task.description}
        render={({ field }) => (
          <TextAreaWithCounter
            value={field.value}
            onChange={field.onChange}
            label={t('taskEdit.labels.description')}
            errorMessage={description?.message}
            maxSymbols={1000}
          />
        )}
      />

      <div className={styles.taskInfoForm__comments}>
        {task.comments.map((comment) => (
          <TaskEditableComment
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
            editComment={editComment}
          />
        ))}
      </div>

      <div className={styles.taskInfoForm__newComment}>
        <AvatarIcon width={30} height={30} className={styles.taskInfoForm__newCommentAvatar} />
        <Controller
          name='comment'
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <TextAreaWithCounter
              value={field.value}
              onChange={field.onChange}
              label={t('task.labels.comment')}
              maxSymbols={600}
            />
          )}
        />
      </div>

      <Button disabled={isSubmitting}>{t('task.buttons.save')}</Button>
    </form>
  );
});
