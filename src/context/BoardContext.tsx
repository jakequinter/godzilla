import { createContext, ReactNode, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import type { Project } from 'types/project';
import useAuth from 'hooks/useAuth';

type BoardContextProps = {
  boards: Project[];
};

export const BoardContext = createContext<BoardContextProps>({
  boards: [],
});

type BoardProviderProps = {
  children: ReactNode;
};

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const { token, jiraInstance } = useAuth();
  const [boards, setBoards] = useState<Project[]>([]);

  useEffect(() => {
    if (token && jiraInstance) {
      fetchBoards(token, jiraInstance);
    }
  }, [token, jiraInstance]);

  const fetchBoards = async (token: string, jiraInstance: string) => {
    try {
      const data = await invoke<Project[]>('fetch_projects', { jiraInstance, token });
      setBoards(data);
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
