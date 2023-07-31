import { Board } from '@/enitities/admin';
import { BoardsManagementStore } from '@/stores/admin';
import { deleteBoard as deleteBoardApi } from '@/shared/api/admin';

export function deleteBoard(boardManagementStore: BoardsManagementStore) {
  const openDeleteModal = (board: Board) => {
    boardManagementStore.selectBoardForDelete(board);
  };

  const approveDelete = async () => {
    const boardId = boardManagementStore.boardForDelete?.id;
    if (boardId) {
      await deleteBoardApi(boardId);
      boardManagementStore.removeBoard(boardId);
      boardManagementStore.removeBoardForDelete();
    }
  };

  const cancelDelete = () => {
    boardManagementStore.removeBoardForDelete();
  };

  return {
    openDeleteModal,
    approveDelete,
    cancelDelete,
  };
}
