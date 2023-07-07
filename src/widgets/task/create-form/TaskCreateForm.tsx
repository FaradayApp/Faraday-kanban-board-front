import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import styles from './TaskCreateForm.module.scss';
import {
  Button,
  FloatingDetepicker,
  FloatingInput,
  FloatingSelect,
  FloatingTextArea,
  withSymbolsCounter,
} from '@/shared/ui-kit';
import { UsersMultiselect } from '@/enitities/user';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '@/enitities/types';

const InputWithCounter = withSymbolsCounter(FloatingInput);
const TextAreaWithCounter = withSymbolsCounter(FloatingTextArea);

export const TaskCreateForm = observer(() => {
  const { t } = useTranslation();

  const { handleSubmit, control, register } = useForm();
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <InputWithCounter 
        {...register('name')}
        label={t('taskEdit.labels.name')}
        maxSymbols={60}
      />

      <Controller
        name='status'
        control={control}
        defaultValue={null}
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
        defaultValue={null}
        control={control}
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
        {...register('description')}
        label={t('taskEdit.labels.description')}
        maxSymbols={1000}
      />

      <Controller
        name='endDate'
        control={control}
        defaultValue={''}
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
        defaultValue={[]}
        render={({ field }) => (
          <UsersMultiselect
            selectedUsers={field.value}
            onSelect={(id) => field.onChange([...field.value, id])}
            onRemove={(id) => field.onChange(field.value.filter((userId: UserId) => userId !== id))}
          />
        )}
      />

      <Button type='submit'>
        {t('taskEdit.buttons.save')}
      </Button>
    </form>
  );
});
