import { useTranslation } from 'react-i18next';

import styles from './BoardManagementPageHeader.module.scss';
import { sessionStore } from '@/stores/session/SessionStore';
import { Heading, LogoutIcon } from '@/shared/ui-kit';

export const BoardManagementPageHeader = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Heading size='lg'>{t('widgetsManagement.title')}</Heading>
      <LogoutIcon 
        onClick={() => sessionStore.clearSession()} 
        className={styles.container__icon}
      />
    </div>
  );
};
