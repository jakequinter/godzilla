import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';

import type { Issue } from 'types/issue';
import useAuth from 'hooks/useAuth';

export default function Home() {
  const { token, jiraInstance, user } = useAuth();

  const { data } = useQuery({
    queryKey: ['fetch-issues', user],
    queryFn: async () =>
      await invoke<Issue>('fetch_issues', {
        jiraInstance,
        token,
        accountId: user?.accountId,
      }),
    enabled: !!token && !!jiraInstance && !!user,
  });

  console.log('data', data);
  return (
    <div>
      <h1 className="text-3xl font-semibold text-violet-600">Home</h1>
      <Link to="/about">go to about</Link>
    </div>
  );
}
