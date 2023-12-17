import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './BoardPageHeader.module.scss';
import { Heading, AddTaskIcon, ProfileIcon } from '@/shared/ui-kit';

export const BoardPageHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Heading size='lg'>{t('board.title')}</Heading>
      <div className={styles.container__controls}>
        <ProfileIcon onClick={() => navigate('profile')} />
        <AddTaskIcon onClick={() => navigate('task/create')} />
      </div>
    </div>
  );
};
