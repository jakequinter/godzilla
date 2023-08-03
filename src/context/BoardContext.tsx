import { createContext, ReactNode, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import matchTransitions from 'utils/matchTransitions';

import type { BoardColumn, BoardColumnConfigColumn } from 'types/project';
import type { Transition } from 'types/transition';
import useAuth from 'hooks/useAuth';
import useProjects from 'hooks/useProjects';

type BoardContextProps = {
  columns: BoardColumnConfigColumn[];
  issueId: string;
  setIssueId: (issueId: string) => void;
  fetchTransitions: () => void;
};

export const BoardContext = createContext<BoardContextProps>({
  columns: [],
  issueId: '',
  setIssueId: () => {},
  fetchTransitions: () => {},
});

type BoardProviderProps = {
  children: ReactNode;
};

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const { token, jiraInstance } = useAuth();
  const [columns, setColumns] = useState<BoardColumnConfigColumn[]>([]);
  const [issueId, setIssueId] = useState<string>('');
  const { project } = useProjects();

  useEffect(() => {
    if (project && issueId) {
      combineConfigAndTransitions();
    }
  }, [project, issueId]);

  const fetchConfig = async () => {
    try {
      return await invoke<BoardColumn>('fetch_board_config', {
        token,
        jiraInstance,
        boardId: project?.boardId,
      });
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  const fetchTransitions = async () => {
    try {
      return await invoke<Transition>('fetch_transitions', {
        token,
        jiraInstance,
        issueId,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const combineConfigAndTransitions = async () => {
    const config = await fetchConfig();
    const transitions = await fetchTransitions();

    if (config && transitions) {
      const combined = matchTransitions(config, transitions);
      setColumns(combined.columnConfig.columns);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        columns,
        issueId,
        setIssueId,
        fetchTransitions,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
