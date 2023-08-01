import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './BoardPageHeader.module.scss';
import { Heading, AddTaskIcon } from '@/shared/ui-kit';

export const BoardPageHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Heading size='lg'>{t('board.title')}</Heading>
      <AddTaskIcon onClick={() => navigate('task/create')} />
    </div>
  );
};
