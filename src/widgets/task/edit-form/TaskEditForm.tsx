import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './TaskEditForm.module.scss';
import {
  Button,
  DeleteConfirm,
  FloatingDetepicker,
  InputWithCounter,
  Text,
  TextAreaWithCounter,
} from '@/shared/ui-kit';
import {
  type TaskInfo,
  TaskPrioritySelect,
  TaskStatusSelect,
  PerformersSelect,
} from '@/enitities/task';
import { type EditTaskSchema, editTaskSchema } from './scheme';
import dayjs from 'dayjs';

type TaskEditFormProps = {
  task: TaskInfo;
  editTask: (task: Partial<TaskInfo>) => void;
  deleteTask: () => void;
};

export const TaskEditForm = observer((props: TaskEditFormProps) => {
  const { task, editTask, deleteTask } = props;
  const { t } = useTranslation();
  const { handleSubmit, control, register, formState, resetField } = useForm<EditTaskSchema>({
    resolver: zodResolver(editTaskSchema),
  });
  const { errors, isSubmitting } = formState;
  const { title, status, priority, description, expiration_date } = errors;

  const onSubmit: SubmitHandler<EditTaskSchema> = (data) => editTask(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <InputWithCounter
        {...register('title', { value: task.title })}
        label={t('taskEdit.labels.name')}
        errorMessage={title?.message}
        maxSymbols={60}
      />

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

      <Controller
        name='priority'
        control={control}
        defaultValue={task.priority}
        render={({ field }) => (
          <TaskPrioritySelect
            value={field.value}
            onChange={(option) => field.onChange(option)}
            errorMessage={priority?.message}
          />
        )}
      />

      <TextAreaWithCounter
        {...register('description', { value: task.description })}
        label={t('taskEdit.labels.description')}
        errorMessage={description?.message}
        maxSymbols={1000}
      />

      <Controller
        name='expiration_date'
        control={control}
        defaultValue={task.expiration_date}
        render={({ field }) => (
          <FloatingDetepicker
            label={t('taskEdit.labels.endDate')}
            value={field.value}
            min={dayjs().format('YYYY-MM-DD')}
            onChange={(date) => (date ? field.onChange(date) : resetField('expiration_date'))}
            errorMessage={expiration_date?.message}
          />
        )}
      />

      <Controller
        name='performers'
        control={control}
        defaultValue={[...task.performers]}
        render={({ field }) => (
          <PerformersSelect
            selectedUsers={field.value}
            onSelect={(user) => field.onChange([...field.value, user])}
            onRemove={(userForRemove) =>
              field.onChange(field.value.filter((user) => user.id !== userForRemove.id))
            }
          />
        )}
      />

      <div className={styles.form__controls}>
        <Button disabled={isSubmitting} type='submit'>
          {t('taskEdit.buttons.save')}
        </Button>

        {task.canEdit && (
          <DeleteConfirm
            title={t('taskEdit.deleteModal.title')}
            approveTitle={t('taskEdit.deleteModal.buttons.delete')}
            cancelTitle={t('taskEdit.deleteModal.buttons.cancel')}
            onApprove={deleteTask}
          >
            <button type='button' className={styles.form__deleteButton}>
              <Text tag='span' size='md' weight='normal'>
                {t('taskEdit.buttons.delete')}
              </Text>
            </button>
          </DeleteConfirm>
        )}
      </div>
    </form>
  );
});
