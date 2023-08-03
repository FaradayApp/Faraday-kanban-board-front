import { PropsWithChildren, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { taskInfoStore } from '@/stores';

export const TaskInfoProvider = (props: PropsWithChildren) => {
  const { id, boardUuid } = useParams();

  useEffect(() => {
    if (id && boardUuid) {
      const taskId = Number.parseInt(id);
      taskInfoStore.init(taskId, boardUuid);
    }
  }, [id, boardUuid]);

  return props.children;
};
