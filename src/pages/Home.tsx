import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';

import type { Issue } from 'types/issue';
import useAuth from 'hooks/useAuth';

export default function Home() {
  const { token, jiraInstance, user } = useAuth();

  const { data } = useQuery<Issue>({
    queryKey: ['fetch-issues', user],
    queryFn: async () =>
      await invoke<Issue>('fetch_issues', {
        jiraInstance,
        token,
        accountId: user?.accountId,
      }),
    enabled: !!token && !!jiraInstance && !!user,
  });

  function renderInProgressIssues(category: string) {
    return data?.issues.map(issue => {
      if (issue.fields.status.name === category) {
        return (
          <Card
            projectKey={issue.key}
            description={issue.fields.summary}
            storyPoints={issue.fields.customfield_10004}
          />
        );
      }
    });
  }

  return (
    <div className="-my-4 flex min-h-screen flex-col py-4">
      <div className="-mx-4 flex flex-1 gap-1 overflow-x-scroll px-4">
        <Column title="To Do" count={1}>
          {renderInProgressIssues('Open')}
        </Column>
        <Column title="In Progress" count={1}>
          {renderInProgressIssues('In Dev')}
        </Column>
        <Column title="Code Review" count={1}>
          {renderInProgressIssues('Ready for Code Review')}
        </Column>
        <Column title="Accepted" count={1}>
          {renderInProgressIssues('In Product Review')}
        </Column>
        <Column title="Done" count={1}>
          {renderInProgressIssues('Accepted')}
        </Column>
      </div>
    </div>
  );
}

type ColumnProps = {
  title: string;
  count: number;
  children: React.ReactNode;
};

function Column({ title, count, children }: ColumnProps) {
  return (
    <div className="flex min-w-[200px] flex-1 flex-col">
      <span className="inline-flex gap-x-2 text-xs font-medium text-gray-700">
        {title}
        <span className="text-gray-400">{count}</span>
      </span>
      <div className="mt-2 flex flex-1 flex-col space-y-2 rounded-md">{children}</div>
    </div>
  );
}

type CardProps = {
  description: string;
  projectKey: string;
  storyPoints: number;
};

function Card({ description, projectKey, storyPoints }: CardProps) {
  return (
    <div className="space-y-2 rounded border border-gray-200 bg-white p-2">
      <span className="inline-flex items-baseline gap-x-2 text-xs font-medium text-gray-400">
        <span>{projectKey}</span>
        <span className="rounded-full bg-gray-100 px-1.5 py-0.5">{storyPoints}</span>
      </span>

      <p className="text-sm">{description}</p>
    </div>
  );
}
