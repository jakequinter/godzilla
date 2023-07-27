import { createContext, ReactNode, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import type { Board, Project } from 'types/project';
import useAuth from 'hooks/useAuth';

type ProjectContextProps = {
  projects: Project[];
};

export const ProjectContext = createContext<ProjectContextProps>({
  projects: [],
});

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { token, jiraInstance } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (token && jiraInstance) {
      fetchProjects();
    }
  }, [token, jiraInstance]);

  const fetchProjects = async () => {
    try {
      const projectsData = await invoke<Project[]>('fetch_projects', { jiraInstance, token });

      const projectsWithBoards = [];

      for (const project of projectsData) {
        const board = await fetchProjectBoard(project.id);
        if (board) {
          projectsWithBoards.push({
            ...project,
            boardId: board.id,
          });
        }
      }

      setProjects(projectsWithBoards);
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  const fetchProjectBoard = async (boardId: string) => {
    try {
      return await invoke<Board>('fetch_board', { jiraInstance, token, boardId });
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
