import clsx from 'clsx';
import { useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useTranslation } from 'react-i18next';

import styles from './TasksSort.module.scss';
import { OptionsIcon, Text } from '@/shared/ui-kit';
import { SortType } from '@/features/tasks';
import { observer } from 'mobx-react-lite';

type TasksSortProps = {
  onSort: (sortType: SortType) => void;
  selected?: SortType;
};

export const TasksSort = observer((props: TasksSortProps) => {
  const { onSort, selected } = props;
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  const buttonClasses = (type: SortType) =>
    clsx(styles.sortButtons__button, {
      [styles.sortButtons__button_selected]: selected === type,
    });

  const pickSortOption = (sortType: SortType) => {
    onSort(sortType);
    setOpen(false);
  };

  return (
    <>
      <OptionsIcon onClick={() => setOpen(true)} />

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[220, 0]}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className={styles.sortButtons}>
              <button onClick={() => pickSortOption('date')} className={buttonClasses('date')}>
                <Text tag='span' size='md'>
                  {t('board.sort.byDate')}
                </Text>
              </button>
              <button onClick={() => pickSortOption('title')} className={buttonClasses('title')}>
                <Text tag='span' size='md'>
                  {t('board.sort.byName')}
                </Text>
              </button>
              <button
                onClick={() => pickSortOption('priority')}
                className={buttonClasses('priority')}>
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
});
