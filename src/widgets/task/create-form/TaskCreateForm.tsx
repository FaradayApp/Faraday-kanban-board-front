import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './TaskCreateForm.module.scss';
import { Button, FloatingDetepicker, InputWithCounter, TextAreaWithCounter } from '@/shared/ui-kit';
import { type NewTask, TaskPrioritySelect, TaskStatusSelect, PerformersSelect } from '@/enitities/task';
import { type NewTaskSchema, newTaskSchema } from './schema';

type TaskCreateFormProps = {
  addTask: (newTask: NewTask) => void;
};

export const TaskCreateForm = observer((props: TaskCreateFormProps) => {
  const { addTask } = props;
  const { t } = useTranslation();
  const { handleSubmit, control, register, formState } = useForm<NewTaskSchema>({
    resolver: zodResolver(newTaskSchema),
  });
  const { errors, isSubmitting } = formState;
  const { status, priority, description, expiration_date } = errors;

  const onSubmit = (data: NewTask) => addTask(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <InputWithCounter
        {...register('title')}
        label={t('taskEdit.labels.name')}
        maxSymbols={60}
        isInvalid={!!status?.message}
        errorMessage={status?.message}
      />

      <Controller
        name='status'
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <TaskStatusSelect
            value={field.value}
            onChange={field.onChange}
            isInvalid={!!status?.message}
            errorMessage={status?.message}
          />
        )}
      />

      <Controller
        name='priority'
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <TaskPrioritySelect
            value={field.value}
            onChange={field.onChange}
            isInvalid={!!priority?.message}
            errorMessage={priority?.message}
          />
        )}
      />

      <TextAreaWithCounter
        {...register('description')}
        label={t('taskEdit.labels.description')}
        maxSymbols={1000}
        isInvalid={!!description?.message}
        errorMessage={description?.message}
      />

      <Controller
        name='expiration_date'
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <FloatingDetepicker
            label={t('taskEdit.labels.endDate')}
            value={field.value}
            onChange={(date) => field.onChange(dayjs(date))}
            isInvalid={!!expiration_date?.message}
            errorMessage={expiration_date?.message}
          />
        )}
      />

      <Controller
        name='performers'
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <PerformersSelect
            selectedUsers={field.value}
            onSelect={(newId) => field.onChange([...field.value, newId])}
            onRemove={(userForRemove) =>
              field.onChange(field.value.filter((user) => user.id !== userForRemove.id))
            }
          />
        )}
      />

      <Button disabled={isSubmitting} type='submit'>
        {t('taskEdit.buttons.save')}
      </Button>
    </form>
  );
});
