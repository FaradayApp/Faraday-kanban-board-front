import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './BoardDelete.module.scss';
import { Modal, Text } from '@/shared/ui-kit';

type BoardDeleteProps = {
  isOpen: boolean;
  onApprove: () => void;
  onCancel: () => void;
};

export const BoardDelete = (props: BoardDeleteProps) => {
  const { isOpen, onApprove, onCancel } = props;
  const { t } = useTranslation();

  const deleteButtonClasses = clsx(styles.boardDelete__button, styles.boardDelete__button_delete);
  const cancelButtonClasses = clsx(styles.boardDelete__button, styles.boardDelete__button_cancel);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.boardDelete__message}>
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
