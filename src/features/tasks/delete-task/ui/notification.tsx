import { CloseButtonProps, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface NotificationOptions {
  duration?: number;
  onCancel?: () => void;
}

interface UndoDeleteButtonProps extends CloseButtonProps {
  onClick?: () => void;
}

const UndoDeleteButton = (props: UndoDeleteButtonProps) => {
  const { onClick, closeToast } = props;
  const { t } = useTranslation();

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
        closeToast(event);
      }}
      className={styles.notification__closeButton}
    >
      {t('taskEdit.deleteModal.notifications.restoreButton')}
    </div>
  );
};

export function notificationSuccess(message: string, options: NotificationOptions) {
  const { duration = 3000, onCancel } = options;

  toast(message, {
    autoClose: duration,
    closeOnClick: false,
    hideProgressBar: false,
    position: 'bottom-center',
    className: styles.notification,
    bodyClassName: styles.notification__body,
    progressClassName: styles.notification__progressBar,
    closeButton: (props) => <UndoDeleteButton {...props} onClick={onCancel} />,
  });
}

export function notificationError(message: string, options: NotificationOptions) {
  const { duration = 3000 } = options;

  toast(message, {
    autoClose: duration,
    closeOnClick: false,
    hideProgressBar: true,
    position: 'bottom-center',
    className: clsx(styles.notification, styles.notification_error),
    bodyClassName: styles.notification__body,
    closeButton: false,
  });
}
