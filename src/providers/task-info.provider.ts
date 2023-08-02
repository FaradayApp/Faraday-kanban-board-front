import { PropsWithChildren, useEffect } from "react"
import { useParams } from 'react-router-dom';

import { taskInfoStore } from "@/stores";

export const TaskInfoProvider = (props: PropsWithChildren) => {
  const { id, boardId } = useParams();

  useEffect(() => {
    if (id && boardId) {
      taskInfoStore.init(id, boardId);
    }
  }, [id, boardId]);

  return props.children;
};
