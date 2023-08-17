import { PropsWithChildren, useRef } from 'react';
import { Dialog } from '@headlessui/react';

import styles from './Modal.module.scss';

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export const Modal = (props: ModalProps) => {
  const { isOpen, onClose, children } = props;
  const ref = useRef(null);

  return (
    <Dialog open={isOpen} className={styles.modal} onClose={onClose} initialFocus={ref}>
      <Dialog.Overlay as='div' className={styles.modal__bg} aria-hidden='true' />
      
      <div ref={ref} onClick={onClose} className={styles.modal__content}>
        <Dialog.Panel
          as='div'
          onClick={(event) => event.stopPropagation()}
          className={styles.modal__body}>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
