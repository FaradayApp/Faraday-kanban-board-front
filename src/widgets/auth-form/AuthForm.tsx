import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import styles from './AuthForm.module.scss';
import { Heading, FloatingInput, Button, EyeIcon } from '@/shared/ui-kit';

const schema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

type FormSchema = z.infer<typeof schema>;
type AuthFormProps = {
  login: (data: FormSchema) => Promise<{ success: boolean }>;
};

export const AuthForm = (props: AuthFormProps) => {
  const { login } = props;
  const { t } = useTranslation();
  const { register, handleSubmit, formState, setError } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const { errors, isValid, isDirty } = formState;

  const usernameError = errors.username?.message;
  const passwordError = errors.password?.message;
  const rootError = errors.root?.message;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const response = await login(data);
    if (!response?.success) {
      setError('root', { message: t('authForm.errors.wrongCredentials') });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading tag='h1' size='xl' className={styles.form__title}>
        {t('authForm.title')}
      </Heading>

      <div className={styles.form__inputs}>
        <FloatingInput
          {...register('username')}
          autoComplete='username'
          label={t('authForm.labels.login')}
          isInvalid={!!usernameError}
          errorMessage={usernameError}
          data-testid='username'
        />

        <FloatingInput
          {...register('password')}
          autoComplete='current-password'
          label={t('authForm.labels.password')}
          type='password'
          controls={<EyeIcon />}
          isInvalid={!!passwordError}
          errorMessage={passwordError}
          data-testid='password'
        />

        <Button disabled={!isValid} type='submit'>
          {t('authForm.buttons.submit')}
        </Button>
      </div>

      {isDirty && (
        <footer className={styles.form__errors}>
          {usernameError && <p className={styles.form__error}>{usernameError}</p>}
          {passwordError && <p className={styles.form__error}>{passwordError}</p>}
          {rootError && <p className={styles.form__error}>{rootError}</p>}
        </footer>
      )}
    </form>
  );
};
