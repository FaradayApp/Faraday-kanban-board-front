import { useTranslation } from 'react-i18next';

import styles from './BoardCard.module.scss';
import { TextArea, TrashIcon, Link, Heading } from '@/shared/ui-kit';
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
        <Heading tag='h3' size='sm' children={title} />
        <TrashIcon onClick={onDelete} className={styles.boardCard__icon} />
      </header>

      <TextArea placeholder={t('widgetsManagement.placeholders.note')} defaultValue={title} />

      <footer className={styles.boardCard__footer}>
        <Link withCopy href={link || ''} />
      </footer>
    </article>
  );
};
