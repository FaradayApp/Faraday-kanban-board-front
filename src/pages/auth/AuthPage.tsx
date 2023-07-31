import { observer } from 'mobx-react-lite';

import styles from './AuthPage.module.scss';
import { PageContainer } from '@/shared/ui-kit';
import { sessionStore } from '@/stores/session/SessionStore';
import { loginUser } from '@/features/auth';
import { AuthForm } from '@/widgets/auth-form';

const login = loginUser(sessionStore);

export const AuthPage = observer(() => {
  return (
    <PageContainer>
      <div className={styles.formContainer}>
        <AuthForm login={login} />
      </div>
    </PageContainer>
  );
});
