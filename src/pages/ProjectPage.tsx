import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';

import type { Issue } from 'types/issue';
import useAuth from 'hooks/useAuth';

export default function ProjectPage() {
  const { projectId } = useParams();
  const { token, jiraInstance } = useAuth();

  const { data, isLoading, error } = useQuery<Issue, Error>({
    queryKey: ['fetch-board-issues', projectId],
    queryFn: async () => {
      try {
        const issues = await invoke<Issue>('fetch_active_sprint_issues', {
          jiraInstance,
          token,
          sprintId: projectId,
        });

        return issues;
      } catch (error) {
        if (typeof error === 'string') {
          throw new Error(error);
        } else {
          throw new Error('Unknown error');
        }
      }
    },
    enabled: !!token && !!jiraInstance && !!projectId,
  });

  // TODO: fetch transitions

  function renderIssues(categories: string[]) {
    const issues = data?.issues.filter(issue => categories.includes(issue.fields.status.name));
    if (!issues) return [];

    return issues.map(issue => {
      return (
        <Card
          projectKey={issue.key}
          description={issue.fields.summary}
          storyPoints={issue.fields.customfield_10004 ?? '-'}
          imgUrl={issue.fields.assignee?.avatarUrls['16x16'] ?? ''}
        />
      );
    });
  }
  console.log('errorrrrrrrrr', error);
  if (error) return <pre>{error.message}</pre>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="-my-4 flex min-h-screen flex-col py-4">
      <div className="-mx-4 flex flex-1 gap-1 overflow-x-scroll px-4">
        <Column title="To Do" count={1}>
          {renderIssues(['Open', 'Ready for Dev', 'Ready for Grooming'])}
        </Column>
        <Column title="In Progress" count={1}>
          {renderIssues(['In Dev'])}
        </Column>
        <Column title="Code Review" count={1}>
          {renderIssues(['In Code Review', 'Ready for Code Review'])}
        </Column>
        <Column title="Accepted" count={1}>
          {renderIssues(['In Product Review', 'In QA', 'Ready for Product Review', 'Ready for QA'])}
        </Column>
        <Column title="Done" count={1}>
          {renderIssues(['Accepted', 'Closed', 'Ready for Release', 'Ready for Stage QA'])}
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
  storyPoints: number | string;
  imgUrl: string;
};

function Card({ description, projectKey, storyPoints, imgUrl }: CardProps) {
  return (
    <div className="space-y-2 rounded border border-gray-200 bg-white p-2">
      <div className="flex items-center justify-between gap-x-2">
        <span className="inline-flex items-baseline gap-x-2 text-xs font-medium text-gray-400">
          <span>{projectKey}</span>
          <span className="rounded-full bg-gray-100 px-1.5 py-0.5">{storyPoints}</span>
        </span>

        {imgUrl && <img className="h-5 w-5 rounded-full" src={imgUrl} />}
      </div>

      <p className="text-sm">{description}</p>
    </div>
  );
}
