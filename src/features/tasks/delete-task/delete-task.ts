import i18n from 'i18next';
import { NavigateFunction } from 'react-router-dom';
import { boardStore } from '@/stores';
import { deleteTask as deleteTaskApi, restoreTask as restoreTaskApi } from '@/shared/api';
import { notificationError, notificationSuccess } from './ui/notification';

export async function deleteTask(taskId: TaskId, navigate: NavigateFunction) {
  try {
    await deleteTaskApi(boardStore.boardUuid, taskId);
    boardStore.removeTask(taskId);
    navigate(`/board/${boardStore.boardUuid}/`);
    notificationSuccess(i18n.t('taskEdit.deleteModal.notifications.deleted'), {
      duration: 15000,
      onCancel: async () => {
        const task = await restoreTaskApi(boardStore.boardUuid, taskId);
        boardStore.addNewTask(task);
      },
    });
  } catch (err) {
    notificationError(i18n.t('taskEdit.deleteModal.notifications.deleteError'), { duration: 5000 });
  }
}
