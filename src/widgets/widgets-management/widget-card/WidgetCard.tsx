import { useTranslation } from 'react-i18next';

import styles from './WidgetCard.module.scss';
import { TextArea, TrashIcon, Link, Heading } from '@/shared/ui-kit';

type WidgetCardProps = {
  title?: string;
  note?: string;
  link?: string;
  select?: () => void;
};

export const WidgetCard = (props: WidgetCardProps) => {
  const { t } = useTranslation();
  const { title, note, link, select } = props;

  return (
    <article className={styles.widgetCard}>
      <header className={styles.widgetCard__header}>
        <Heading tag='h3' size='sm' children={title} />
        <TrashIcon onClick={select} />
      </header>

      <TextArea placeholder={t('widgetsManagement.placeholders.note')} defaultValue={note} />

      <footer className={styles.widgetCard__footer}>
        <Link withCopy href={link || ''} />
      </footer>
    </article>
  );
};
