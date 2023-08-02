import { PropsWithChildren, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { boardStore } from '@/stores/board';

export const BoardProvider = (props: PropsWithChildren) => {
  const { boardId } = useParams();

  useEffect(() => {
    if (boardId) {
      boardStore.setBoardId(boardId);
      boardStore.init();
    }
  }, [boardId]);

  return props.children;
};
