import { boardStore } from '@/stores/board';
import { PropsWithChildren, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const BoardProvider = (props: PropsWithChildren) => {
  const { boardId } = useParams();

  useEffect(() => {
    if (boardId) {
      boardStore.setBoardId(boardId);
    }
  }, [boardId]);

  return props.children;
};
