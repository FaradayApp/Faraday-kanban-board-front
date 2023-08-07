import { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import styles from './BoardsManagementPage.module.scss';
import { Button, PageContainer } from '@/shared/ui-kit';
import { boardsManagementStore } from '@/stores/admin';
import {
  BoardCard,
  BoardCreate,
  BoardManagementPageHeader,
} from '@/widgets/admin/boards-management';
import { createBoard, deleteBoard } from '@/features/admin';
import { Board } from '@/enitities/admin';

export const BoardsManagementPage = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    boardsManagementStore.init();
  }, []);

  const onBoardDelete = useCallback(
    (board: Board) => deleteBoard(boardsManagementStore)(board),
    []
  );

  const { openCreateModal, closeCreateModal, createNewBoard } = useMemo(
    () => createBoard(boardsManagementStore),
    []
  );

  const boards = boardsManagementStore.boards.data;

  return (
    <PageContainer
      loading={boardsManagementStore.boards.isPending}
      header={<BoardManagementPageHeader />}>
      <div className={styles.addBoard}>
        <Button as='secondary' onClick={openCreateModal}>
          {t('widgetsManagement.buttons.addWidget')}
        </Button>
      </div>

      <div className={styles.boardsList}>
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} onDelete={() => onBoardDelete(board)} />
        ))}
      </div>

      <BoardCreate
        isOpen={boardsManagementStore.showCreateBoardModal}
        onCancel={closeCreateModal}
        onCreate={createNewBoard}
      />
    </PageContainer>
  );
});
