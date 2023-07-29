import { useContext } from 'react';

import { BoardContext } from 'context/BoardContext';

export default function useBoard() {
  const { columns, issueId, setIssueId, fetchTransitions } = useContext(BoardContext);

  return { columns, issueId, setIssueId, fetchTransitions };
}
