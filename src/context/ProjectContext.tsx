import { createContext, ReactNode, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import type { Board, Project } from 'types/project';
import useAuth from 'hooks/useAuth';

type ProjectContextProps = {
  project: Project | null;
  setProject: (project: Project | null) => void;
  projects: Project[];
};

export const ProjectContext = createContext<ProjectContextProps>({
  project: null,
  setProject: () => {},
  projects: [],
});

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { token, jiraInstance } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (token && jiraInstance) {
      fetchProjects();
    }
  }, [token, jiraInstance]);

  const fetchProjects = async () => {
    try {
      const projectsData = await invoke<Project[]>('fetch_projects', { jiraInstance, token });

      const projectsWithBoard = [];

      for (const project of projectsData) {
        const board = await fetchProjectBoard(project.id);

        if (board) {
          projectsWithBoard.push({
            ...project,
            boardId: board.id,
          });
        }
      }

      setProjects(projectsWithBoard);
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

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        projects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
