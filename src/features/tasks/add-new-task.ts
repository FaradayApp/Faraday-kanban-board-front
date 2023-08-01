import { NavigateFunction } from 'react-router-dom';

import { NewTask } from '@/enitities/task';
import { createNewTask } from '@/shared/api';
import { BoardStore } from '@/stores/board/BoardStore';

export function addNewTask(boardStore: BoardStore, navigate: NavigateFunction) {
  return async function (newTask: NewTask) {
    await createNewTask(boardStore.boardId, newTask);
    navigate(`/board/${boardStore.boardId}/`);
  };
}
