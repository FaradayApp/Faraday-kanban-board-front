import { PropsWithChildren, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { boardStore } from '@/stores/board';

export const BoardProvider = (props: PropsWithChildren) => {
  const { boardUuid } = useParams();

  useEffect(() => {
    if (boardUuid) {
      boardStore.setBoardUuid(boardUuid);
      boardStore.init();
    }
  }, [boardUuid]);

  return props.children;
};
