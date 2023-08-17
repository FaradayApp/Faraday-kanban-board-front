import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './BoardManagementPageHeader.module.scss';
import { sessionStore } from '@/stores/session/SessionStore';
import { ConfirmModal, Heading, LogoutIcon, ProfileIcon } from '@/shared/ui-kit';

export const BoardManagementPageHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Heading size='lg'>{t('widgetsManagement.title')}</Heading>
      <div className={styles.container__controls}>
        <ProfileIcon onClick={() => navigate('/admin/profile')} />
        <ConfirmModal
          title={t('exitModal.title')}
          approveTitle={t('exitModal.approve')}
          cancelTitle={t('exitModal.cancel')}
          onApprove={() => sessionStore.clearSession()}>
          <LogoutIcon className={styles.container__icon} />
        </ConfirmModal>
      </div>
    </div>
  );
};
