import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './WidgetDelete.module.scss';
import { Modal, Text } from '@/shared/ui-kit';

type WidgetDeleteProps = {
  isOpen: boolean;
  onApprove: () => void;
  onCancel: () => void;
};

export const WidgetDelete = (props: WidgetDeleteProps) => {
  const { isOpen, onApprove, onCancel } = props;
  const { t } = useTranslation();

  const deleteButtonClasses = clsx(styles.widgetDelete__button, styles.widgetDelete__button_delete);
  const cancelButtonClasses = clsx(styles.widgetDelete__button, styles.widgetDelete__button_cancel);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.widgetDelete__message}>
        <Text size='md' tag='p'>
          {t('widgetsManagement.deleteModal.message')}
        </Text>
      </div>
      <button onClick={onApprove} className={deleteButtonClasses}>
        {t('widgetsManagement.deleteModal.buttons.delete')}
      </button>
      <button onClick={onCancel} className={cancelButtonClasses}>
        {t('widgetsManagement.deleteModal.buttons.cancel')}
      </button>
    </Modal>
  );
};
