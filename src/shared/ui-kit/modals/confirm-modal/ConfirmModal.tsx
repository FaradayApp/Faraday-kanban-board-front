import clsx from 'clsx';

import styles from './ConfirmModal.module.scss';
import { Modal, Text } from '@/shared/ui-kit';
import { PropsWithChildren, useState } from 'react';

type ConfirmModalProps = PropsWithChildren<{
  title?: string;
  approveTitle?: string;
  cancelTitle?: string;
  onApprove?: () => void | Promise<unknown>;
  onCancel?: () => void | Promise<unknown>;
  type?: 'neutral' | 'danger';
}>;

export const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    title,
    approveTitle,
    cancelTitle,
    children,
    onApprove,
    onCancel,
    type = 'neutral',
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const modalClasses = clsx(styles.confirmModal, {
    [styles.confirmModal_neutral]: type === 'neutral',
    [styles.confirmModal_danger]: type === 'danger',
  });
  const approveButtonClasses = clsx(
    styles.confirmModal__button,
    styles.confirmModal__button_confirm
  );
  const cancelButtonClasses = clsx(styles.confirmModal__button, styles.confirmModal__button_cancel);

  const approve = async () => {
    await onApprove?.();
    setIsOpen(false);
  };

  const cancel = async () => {
    await onCancel?.();
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      <Modal isOpen={isOpen} onClose={cancel}>
        <div className={modalClasses}>
          <div className={styles.confirmModal__message}>
            <Text size='md' tag='p'>
              {title}
            </Text>
          </div>
          <div className={styles.confirmModal__controls}>
            <button onClick={approve} className={approveButtonClasses}>
              {approveTitle}
            </button>
            <button onClick={cancel} className={cancelButtonClasses}>
              {cancelTitle}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
