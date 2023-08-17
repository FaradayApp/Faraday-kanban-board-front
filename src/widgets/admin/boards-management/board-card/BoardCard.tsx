import { useTranslation } from 'react-i18next';

import styles from './BoardCard.module.scss';
import { Text, TrashIcon, Link, Heading, DeleteConfirm } from '@/shared/ui-kit';
import { type Board } from '@/enitities/admin';

type BoardCardProps = {
  board: Board;
  onDelete?: () => void;
};

export const BoardCard = (props: BoardCardProps) => {
  const { t } = useTranslation();
  const { board, onDelete } = props;
  const { uuid, title } = board;

  const link = `${import.meta.env.VITE_SITE_URL}/board/${uuid}/`;

  return (
    <article className={styles.boardCard}>
      <header className={styles.boardCard__header}>
        <Heading tag='h3' size='md' children={title} />
        <DeleteConfirm
          title={t('widgetsManagement.deleteModal.message')}
          approveTitle={t('widgetsManagement.deleteModal.buttons.delete')}
          cancelTitle={t('widgetsManagement.deleteModal.buttons.cancel')}
          onApprove={onDelete}>
          <TrashIcon className={styles.boardCard__icon} />
        </DeleteConfirm>
      </header>

      <div className={styles.boardCard__note}>
        <Text tag='p' size='sm'>
          {title}
        </Text>
      </div>

      <footer className={styles.boardCard__footer}>
        <Link withCopy withCopyNotification href={link || ''} />
      </footer>
    </article>
  );
};
