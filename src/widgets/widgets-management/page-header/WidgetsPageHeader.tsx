import { useTranslation } from 'react-i18next';

import styles from './WidgetsPageHeader.module.scss';
import { sessionStore } from '@/stores/Session';
import { Heading, LogoutIcon } from '@/shared/ui-kit';

export const WidgetsPageHeader = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Heading size='lg'>{t('widgetsManagement.title')}</Heading>
      <LogoutIcon onClick={() => sessionStore.logout()} />
    </div>
  );
};
