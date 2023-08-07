import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import styles from './BoardsManagementPage.module.scss';
import { Button, PageContainer } from '@/shared/ui-kit';
import { boardsManagementStore } from '@/stores/admin';
import {
  BoardCard,
  BoardCreate,
  BoardDelete,
  BoardManagementPageHeader,
} from '@/widgets/admin/boards-management';
import { createBoard, deleteBoard } from '@/features/admin';

export const BoardsManagementPage = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    boardsManagementStore.init();
  }, []);

  const { approveDelete, cancelDelete, openDeleteModal } = useMemo(
    () => deleteBoard(boardsManagementStore),
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
          <BoardCard key={board.id} board={board} onDelete={() => openDeleteModal(board)} />
        ))}
      </div>

      <BoardDelete
        isOpen={!!boardsManagementStore.boardForDelete}
        onApprove={approveDelete}
        onCancel={cancelDelete}
      />

      <BoardCreate
        isOpen={boardsManagementStore.showCreateBoardModal}
        onCancel={closeCreateModal}
        onCreate={createNewBoard}
      />
    </PageContainer>
  );
});
