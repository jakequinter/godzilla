import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';

import type { Issue } from 'types/issue';
import useAuth from 'hooks/useAuth';

export default function Project() {
  const { projectId } = useParams();
  const { token, jiraInstance } = useAuth();

  const { data } = useQuery<Issue>({
    queryKey: ['fetch-board-issues', projectId],
    queryFn: async () =>
      await invoke<Issue>('fetch_active_sprint_issues', {
        jiraInstance,
        token,
        sprintId: projectId,
      }),
    enabled: !!token && !!jiraInstance && !!projectId,
  });
  console.log('data', data);

  return (
    <div className="-my-4 flex min-h-screen flex-col py-4">
      <h1>{projectId}</h1>
    </div>
  );
}
