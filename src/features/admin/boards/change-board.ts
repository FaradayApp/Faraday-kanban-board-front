import i18n from 'i18next';
import { ChangeBoard } from '@/enitities/admin';
import { BoardsManagementStore } from '@/stores/admin';
import { changeBoard as changeBoardApi } from '@/shared/api/admin';
import { successNotification } from '@/shared/lib/notify';

export function changeBoard(boardManagementStore: BoardsManagementStore) {
  return async function (data: ChangeBoard) {
    const chnagedBoard = await changeBoardApi(data, data.boardId);
    boardManagementStore.updateBoard(chnagedBoard);
    successNotification(i18n.t('widgetsManagement.editModal.notifications.changed'));
  };
}
