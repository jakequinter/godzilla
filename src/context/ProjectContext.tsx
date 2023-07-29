import { createContext, ReactNode, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import type { Board, Project } from 'types/project';
import useAuth from 'hooks/useAuth';

type ProjectContextProps = {
  projects: Project[];
  project: Project | null;
  setProject: (project: Project) => void;
  loading: boolean;
};

export const ProjectContext = createContext<ProjectContextProps>({
  projects: [],
  project: null,
  setProject: () => {},
  loading: false,
});

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { token, jiraInstance } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token && jiraInstance) {
      fetchProjects();
    }
  }, [token, jiraInstance]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const projectsData = await invoke<Project[]>('fetch_projects', { jiraInstance, token });

      const fullProjects = [];

      for (const project of projectsData) {
        const board = await fetchProjectBoard(project.id);

        if (board) {
          const activeSprint = await fetchActiveSprint(board.id);

          if (activeSprint) {
            fullProjects.push({
              ...project,
              boardId: board.id,
              activeSprintId: activeSprint.id,
            });
          }
        }
      }

      setProjects(fullProjects);
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
    setLoading(false);
  };

  const fetchProjectBoard = async (projectId: string) => {
    try {
      return await invoke<Board>('fetch_board', { jiraInstance, token, projectId });
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  const fetchActiveSprint = async (boardId: number) => {
    try {
      return await invoke<Board>('fetch_active_sprint', { jiraInstance, token, boardId });
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        setProject,
        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
