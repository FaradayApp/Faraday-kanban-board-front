import clsx from 'clsx';
import { useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useTranslation } from 'react-i18next';

import styles from './TasksSort.module.scss';
import { OptionsIcon, Text } from '@/shared/ui-kit';
import { SortOptions } from '@/enitities/types';

type TasksSortProps = {
  onSort: (sortType: SortOptions) => void;
};

export const TasksSort = ({ onSort }: TasksSortProps) => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  const buttonClasses = clsx(styles.sortButtons__button);

  const selectedButtonClasses = clsx(
    styles.sortButtons__button,
    styles.sortButtons__button_selected
  );

  const pickSortOption = (sortType: SortOptions) => {
    onSort(sortType);
    setOpen(false);
  }

  return (
    <>
      <OptionsIcon onClick={() => setOpen(true)} />

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[220, 0]}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className={styles.sortButtons}>
              <button onClick={() => pickSortOption('byDate')} className={buttonClasses}>
                <Text tag='span' size='md'>
                  {t('board.sort.byDate')}
                </Text>
              </button>
              <button onClick={() => pickSortOption('byName')} className={buttonClasses}>
                <Text tag='span' size='md'>
                  {t('board.sort.byName')}
                </Text>
              </button>
              <button onClick={() => pickSortOption('byPriority')} className={buttonClasses}>
                <Text tag='span' size='md'>
                  {t('board.sort.byPriority')}
                </Text>
              </button>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setOpen(false)} />
      </Sheet>
    </>
  );
};
