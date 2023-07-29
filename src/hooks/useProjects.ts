import { useContext } from 'react';

import { ProjectContext } from 'context/ProjectContext';

export default function useProjects() {
  const { projects, project, setProject, loading } = useContext(ProjectContext);

  return { projects, project, setProject, loading };
}
