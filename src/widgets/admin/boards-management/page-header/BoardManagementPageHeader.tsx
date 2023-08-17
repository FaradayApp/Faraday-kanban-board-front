import { useTranslation } from 'react-i18next';

import styles from './BoardManagementPageHeader.module.scss';
import { sessionStore } from '@/stores/session/SessionStore';
import { ConfirmModal, Heading, LogoutIcon } from '@/shared/ui-kit';

export const BoardManagementPageHeader = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Heading size='lg'>{t('widgetsManagement.title')}</Heading>
      <ConfirmModal
        title={t('exitModal.title')}
        approveTitle={t('exitModal.approve')}
        cancelTitle={t('exitModal.cancel')}
        onApprove={() => sessionStore.clearSession()}>
        <LogoutIcon className={styles.container__icon} />
      </ConfirmModal>
    </div>
  );
};
