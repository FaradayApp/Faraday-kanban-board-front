import { Board } from '@/enitities/admin';
import { BoardsManagementStore } from '@/stores/admin';
import { deleteBoard as deleteBoardApi } from '@/shared/api/admin';

export function deleteBoard(boardManagementStore: BoardsManagementStore) {
  return async function (board: Board) {
    const boardId = board?.id;
    if (boardId) {
      await deleteBoardApi(boardId);
      boardManagementStore.removeBoard(boardId);
    }
  };
}
