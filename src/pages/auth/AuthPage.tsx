import { observer } from 'mobx-react-lite';

import styles from './AuthPage.module.scss';
import { sessionStore } from '@/stores/Session';
import { PageContainer } from '@/shared/ui-kit';
import { AuthForm } from '@/widgets/auth-form';

export const AuthPage = observer(() => {
  return (
    <PageContainer>
      <div className={styles.formContainer}>
        <AuthForm login={sessionStore.login.bind(sessionStore)} />
      </div>
    </PageContainer>
  );
});
