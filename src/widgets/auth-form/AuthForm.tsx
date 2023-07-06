import { useTranslation } from 'react-i18next';

import styles from './AuthForm.module.scss';
import { useAuthForm, type LoginFn } from './useAuthForm';
import { Heading, FloatingInput, Button, EyeIcon } from '@/shared/ui-kit';

type AuthFormProps = {
  login?: LoginFn;
};

export const AuthForm = ({ login }: AuthFormProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors, isValid, isDirty } = useAuthForm(login);

  return (
    <form onSubmit={handleSubmit}>
      <Heading tag='h1' size='xl' className={styles.form__title}>
        {t('authForm.title')}
      </Heading>

      <div className={styles.form__inputs}>
        <FloatingInput
          {...register('login')}
          autoComplete='username'
          label={t('authForm.labels.login')}
          isInvalid={!!errors.login?.message}
          errorMessage={errors.login?.message}
          data-testid='username'
        />

        <FloatingInput
          {...register('password')}
          autoComplete='current-password'
          label={t('authForm.labels.password')}
          type='password'
          controls={<EyeIcon />}
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
          data-testid='password'
        />

        <Button disabled={!isValid} type='submit'>
          {t('authForm.buttons.submit')}
        </Button>
      </div>

      {isDirty && (
        <footer className={styles.form__errors}>
          <p className={styles.form__error}>{errors.login?.message}</p>
          <p className={styles.form__error}>{errors.password?.message}</p>
        </footer>
      )}
    </form>
  );
};
