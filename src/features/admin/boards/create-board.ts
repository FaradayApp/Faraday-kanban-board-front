import i18n from 'i18next';
import { CreateBoard } from '@/enitities/admin';
import { BoardsManagementStore } from '@/stores/admin';
import { createBoard as createBoardApi } from '@/shared/api/admin';
import { successNotification } from '@/shared/lib/notify';

export function createBoard(boardManagementStore: BoardsManagementStore) {
  const openCreateModal = () => {
    boardManagementStore.openCreateBoardModal();
  };

  const createNewBoard = async (data: CreateBoard) => {
    const createdBoard = await createBoardApi(data);
    boardManagementStore.addBoard(createdBoard);
    boardManagementStore.closeCreateBoardModal();
    successNotification(i18n.t('widgetsManagement.notifications.boardCreated'));
  };

  const closeCreateModal = () => {
    boardManagementStore.closeCreateBoardModal();
  };

  return {
    openCreateModal,
    createNewBoard,
    closeCreateModal,
  };
}
