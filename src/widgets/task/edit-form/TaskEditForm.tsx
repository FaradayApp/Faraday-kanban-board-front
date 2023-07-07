import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import styles from './TaskEditForm.module.scss';
import {
  Button,
  FloatingDetepicker,
  FloatingInput,
  FloatingSelect,
  FloatingTextArea,
  withSymbolsCounter,
} from '@/shared/ui-kit';
import { tasksStore } from '@/stores';
import { UsersMultiselect } from '@/enitities/user';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '@/enitities/types';

const InputWithCounter = withSymbolsCounter(FloatingInput);
const TextAreaWithCounter = withSymbolsCounter(FloatingTextArea);

export const TaskEditForm = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { handleSubmit, control, register } = useForm();
  const onSubmit = (data: unknown) => console.log(data);

  if (!id) return null;

  const task = tasksStore.getById(id);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <InputWithCounter
        {...register('name', { value: task.data.name })}
        label={t('taskEdit.labels.name')}
        maxSymbols={60}
      />

      <Controller
        name='status'
        control={control}
        defaultValue={task.data.status}
        render={({ field }) => (
          <FloatingSelect
            label={t('taskEdit.labels.status')}
            options={STATUS_OPTIONS}
            value={field.value}
            onChange={(option) => field.onChange(option)}
          />
        )}
      />

      <Controller
        name='priority'
        control={control}
        defaultValue={task.data.priority}
        render={({ field }) => (
          <FloatingSelect
            label={t('taskEdit.labels.priority')}
            options={PRIORITY_OPTIONS}
            value={field.value}
            onChange={(option) => field.onChange(option)}
          />
        )}
      />

      <TextAreaWithCounter
        {...register('description', { value: task.data.description })}
        label={t('taskEdit.labels.description')}
        maxSymbols={1000}
      />

      <Controller
        name='endDate'
        control={control}
        defaultValue={task.data.dates.end}
        render={({ field }) => (
          <FloatingDetepicker
            label={t('taskEdit.labels.endDate')}
            value={field.value}
            onChange={(date) => field.onChange(dayjs(date).format('DD.MM.YYYY'))}
          />
        )}
      />

      <Controller
        name='workers'
        control={control}
        defaultValue={[...task.data.workers]}
        render={({ field }) => (
          <UsersMultiselect
            selectedUsers={field.value}
            onSelect={(id) => field.onChange([...field.value, id])}
            onRemove={(id) => field.onChange(field.value.filter((userId: UserId) => userId !== id))}
          />
        )}
      />

      <Button type='submit'>{t('taskEdit.buttons.save')}</Button>
    </form>
  );
});
