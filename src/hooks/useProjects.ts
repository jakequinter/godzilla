import { useContext } from 'react';

import { ProjectContext } from 'context/ProjectContext';

export default function useProjects() {
  const { project, setProject, projects, loading } = useContext(ProjectContext);

  return { project, setProject, projects, loading };
}
