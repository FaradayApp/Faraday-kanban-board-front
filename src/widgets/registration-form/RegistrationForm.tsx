import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './RegistrationForm.module.scss';
import { Heading, FloatingInput, Button, FloatingPasswordInput } from '@/shared/ui-kit';
import { RegistrationSchema, registrationSchema } from './schema';

type RegistrationFormProps = {
  submit: (data: RegistrationSchema) => Promise<{ success: boolean; message?: string }>;
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { submit } = props;
  const { t } = useTranslation();
  const { register, handleSubmit, formState, setError } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
  });

  const { errors, isValid, isDirty } = formState;
  const { username, password, first_name, last_name, root } = errors;

  const onSubmit: SubmitHandler<RegistrationSchema> = async (data) => {
    const response = await submit(data);
    if (!response?.success) {
      setError('root', { message: response.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading tag='h1' size='xl' className={styles.form__title}>
        {t('registrationForm.title')}
      </Heading>

      <div className={styles.form__inputs}>
        <FloatingInput
          {...register('first_name')}
          label={t('registrationForm.labels.firstName')}
          errorMessage={first_name?.message}
        />

        <FloatingInput
          {...register('last_name')}
          label={t('registrationForm.labels.lastName')}
          errorMessage={last_name?.message}
        />

        <FloatingInput
          {...register('username')}
          label={t('registrationForm.labels.login')}
          errorMessage={username?.message}
        />

        <FloatingPasswordInput
          {...register('password')}
          label={t('registrationForm.labels.password')}
          errorMessage={password?.message}
        />

        <Button disabled={!isValid} type='submit'>
          {t('registrationForm.buttons.submit')}
        </Button>
      </div>

      {isDirty && (
        <footer className={styles.form__errors}>
          {root?.message && <p className={styles.form__error}>{root?.message}</p>}
        </footer>
      )}
    </form>
  );
};
