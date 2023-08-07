import clsx from 'clsx';

import styles from './DeleteConfirm.module.scss';
import { Modal, Text } from '@/shared/ui-kit';
import { PropsWithChildren, useState } from 'react';

type DeleteConfirmProps = PropsWithChildren<{
  title?: string;
  approveTitle?: string;
  cancelTitle?: string;
  onApprove?: () => void | Promise<unknown>;
  onCancel?: () => void | Promise<unknown>;
}>;

export const DeleteConfirm = (props: DeleteConfirmProps) => {
  const { title, approveTitle, cancelTitle, children, onApprove, onCancel } = props;
  const [isOpen, setIsOpen] = useState(false);

  const deleteButtonClasses = clsx(styles.boardDelete__button, styles.boardDelete__button_delete);
  const cancelButtonClasses = clsx(styles.boardDelete__button, styles.boardDelete__button_cancel);

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
        <div className={styles.boardDelete__message}>
          <Text size='md' tag='p'>
            {title}
          </Text>
        </div>
        <button onClick={approve} className={deleteButtonClasses}>
          {approveTitle}
        </button>
        <button onClick={cancel} className={cancelButtonClasses}>
          {cancelTitle}
        </button>
      </Modal>
    </>
  );
};
