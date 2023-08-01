import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './AuthPage.module.scss';
import { PageContainer } from '@/shared/ui-kit';
import { sessionStore } from '@/stores/session/SessionStore';
import { loginUser, registerUser } from '@/features/auth';
import { AuthForm } from '@/widgets/auth-form';
import { RegistrationForm } from '@/widgets/registration-form';

const login = loginUser(sessionStore);
const register = registerUser(sessionStore);

export const AuthPage = observer(() => {
  const [form, setForm] = useState<'login' | 'register'>('login');

  return (
    <PageContainer>
      <div className={styles.formContainer}>
        {form === 'login' && <AuthForm login={login} />}
        {form === 'register' && <RegistrationForm submit={register} />}

        <div className={styles.formContainer__bottomLink}>
          {form === 'login' && <div onClick={() => setForm('register')}>Регистрация</div>}
          {form === 'register' && <div onClick={() => setForm('login')}>Войти</div>}
        </div>
      </div>
    </PageContainer>
  );
});
