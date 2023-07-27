import { createContext, ReactNode, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import type { Board, Project, Sprint } from 'types/project';
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

      const fullProjects = [];

      for (const project of projectsData) {
        const board = await fetchProjectBoard(project.id);

        if (board) {
          const sprint = await fetchBoardActiveSprint(board.id.toString());

          if (sprint) {
            fullProjects.push({
              ...project,
              boardId: board.id,
              sprintId: sprint.id,
            });
          }
        }
      }

      setProjects(fullProjects);
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  const fetchProjectBoard = async (projectId: string) => {
    try {
      return await invoke<Board>('fetch_board', { jiraInstance, token, projectId });
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  const fetchBoardActiveSprint = async (boardId: string) => {
    try {
      return await invoke<Sprint>('fetch_active_sprint', { jiraInstance, token, boardId });
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
