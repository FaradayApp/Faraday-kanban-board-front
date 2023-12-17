import { useTranslation } from 'react-i18next';

import styles from './BoardCard.module.scss';
import { TrashIcon, Link, Heading, DeleteConfirm, EditIcon } from '@/shared/ui-kit';
import { ChangeBoard, type Board } from '@/enitities/admin';
import { BoardEdit } from '../board-edit';

type BoardCardProps = {
  board: Board;
  onDelete?: () => void;
  onEdit?: (data: ChangeBoard) => Promise<unknown>;
};

export const BoardCard = (props: BoardCardProps) => {
  const { t } = useTranslation();
  const { board, onDelete, onEdit } = props;
  const { uuid, title } = board;

  const link = `${import.meta.env.VITE_SITE_URL}/board/${uuid}/`;

  return (
    <article className={styles.boardCard}>
      <header className={styles.boardCard__header}>
        <Heading tag='h3' size='md' children={title} />
        <div className={styles.boardCard__controls}>
          {onEdit && (
            <BoardEdit board={board} onEdit={onEdit}>
              <EditIcon />
            </BoardEdit>
          )}
          <DeleteConfirm
            title={t('widgetsManagement.deleteModal.message')}
            approveTitle={t('widgetsManagement.deleteModal.buttons.delete')}
            cancelTitle={t('widgetsManagement.deleteModal.buttons.cancel')}
            onApprove={onDelete}>
            <TrashIcon className={styles.boardCard__icon} />
          </DeleteConfirm>
        </div>
      </header>

      <footer className={styles.boardCard__footer}>
        <Link withCopy withCopyNotification href={link || ''} />
      </footer>
    </article>
  );
};
