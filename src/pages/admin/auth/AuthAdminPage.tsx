import { observer } from 'mobx-react-lite';

import styles from './AuthAdminPage.module.scss';
import { PageContainer } from '@/shared/ui-kit';
import { sessionStore } from '@/stores/session/SessionStore';
import { loginAdmin } from '@/features/auth';
import { AuthForm } from '@/widgets/auth-form';

const login = loginAdmin(sessionStore);

export const AuthAdminPage = observer(() => {
  return (
    <PageContainer>
      <div className={styles.formContainer}>{<AuthForm login={login} />}</div>
    </PageContainer>
  );
});
