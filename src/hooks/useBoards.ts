import { useContext } from 'react';

import { BoardContext } from 'context/BoardContext';

export default function useBoards() {
  const { boards } = useContext(BoardContext);

  return { boards };
}
