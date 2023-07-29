import { useContext } from 'react';

import { ProjectContext } from 'context/ProjectContext';

export default function useProjects() {
  const { projects, loading } = useContext(ProjectContext);

  return { projects, loading };
}
