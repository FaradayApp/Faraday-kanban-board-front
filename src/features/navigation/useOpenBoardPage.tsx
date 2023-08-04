import { boardStore } from '@/stores';
import { useNavigate, useParams } from 'react-router-dom';

function createLink(boardUuid: BoardUuid) {
  return `/board/${boardUuid}`;
}

export const useOpenBoardPage = () => {
  const { boardUuid } = useParams();
  const navigate = useNavigate();

  const openBoardPage = () => {
    if (boardUuid) {
      navigate(createLink(boardUuid));
    } else if (boardStore.boardUuid) {
      navigate(createLink(boardStore.boardUuid));
    }
  };

  return { openBoardPage };
};
