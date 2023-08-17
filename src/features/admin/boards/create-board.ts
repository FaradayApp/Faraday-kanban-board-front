import i18n from 'i18next';
import { toast } from 'react-toastify';
import { CreateBoard } from '@/enitities/admin';
import { BoardsManagementStore } from '@/stores/admin';
import { createBoard as createBoardApi } from '@/shared/api/admin';

export function createBoard(boardManagementStore: BoardsManagementStore) {
  const openCreateModal = () => {
    boardManagementStore.openCreateBoardModal();
  };

  const createNewBoard = async (data: CreateBoard) => {
    const createdBoard = await createBoardApi(data);
    boardManagementStore.addBoard(createdBoard);
    boardManagementStore.closeCreateBoardModal();

    
    toast.success(i18n.t('widgetsManagement.notifications.boardCreated'), {
      position: 'top-right',
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
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
