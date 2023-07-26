import { createContext, ReactNode, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import type { Project } from 'types/project';
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
      fetchProjects(token, jiraInstance);
    }
  }, [token, jiraInstance]);

  const fetchProjects = async (token: string, jiraInstance: string) => {
    try {
      const data = await invoke<Project[]>('fetch_projects', { jiraInstance, token });
      setProjects(data);
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  // const fetchProject = async (token: string, jiraInstance: string) => {
  //   try {
  //     const data = await invoke<Project[]>('fetch_projects', { jiraInstance, token });
  //     setProjects(data);
  //   } catch (error) {
  //     // TODO: show errors
  //     console.log('error', error);
  //   }
  // };

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
