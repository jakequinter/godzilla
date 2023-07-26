import { useContext } from 'react';

import { ProjectContext } from 'context/ProjectContext';

export default function useProjects() {
  const { projects } = useContext(ProjectContext);

  return { projects };
}
