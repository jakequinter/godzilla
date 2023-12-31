import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import type { Issue, SprintIssue } from 'types/issue';
import type { BoardColumnConfigColumn } from 'types/project';
import type { TransitionValue } from 'types/transition';
import useAuth from 'hooks/useAuth';
import useBoard from 'hooks/useBoard';
import useInvoke from 'hooks/useInvoke';
import useProjects from 'hooks/useProjects';

import Column from 'components/Column';
import { IssueCard } from 'components/IssueCard';

export default function ProjectPage() {
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const { token, jiraInstance } = useAuth();
  const { columns, setIssueId } = useBoard();
  const { projects, project, setProject } = useProjects();

  type UpdateIssueData = {
    issue: SprintIssue;
    transition: TransitionValue;
    columnName: string;
  };

  const mutation = useMutation({
    mutationFn: async (data: UpdateIssueData) => {
      return await invoke('update_issue', {
        token,
        jiraInstance,
        issueId: data.issue.id,
        transitionId: data.transition.id,
      });
    },
    onMutate: async newData => {
      const previousIssues = queryClient.getQueryData(['fetch-board-issues', project]);
      queryClient.setQueryData(['fetch-board-issues', project], old => {
        const issues = [...old.issues];
        const issueIndex = issues.findIndex(issue => issue.id === newData.issue.id);
        if (issueIndex !== -1) {
          issues[issueIndex].fields.status.id = newData.transition.to.id;
          issues[issueIndex].fields.status.name = newData.columnName;
        }
        return { ...old, issues };
      });

      return { previousIssues };
    },
    onSuccess: () => {
      console.log('success');
      // queryClient.invalidateQueries({ queryKey: ['fetch-board-issues', project] });
    },
    onError: (err, newData, context) => {
      console.log('error');
      if (context?.previousIssues) {
        queryClient.setQueryData(['fetch-board-issues', project], context.previousIssues);
      }
    },
  });

  useEffect(() => {
    if (projectId) {
      const project = projects.find(project => project.id === projectId);
      if (project) {
        setProject(project);
      }
    }
  }, [projectId, projects]);

  const { data, isLoading, error } = useQuery<Issue, Error>({
    queryKey: ['fetch-board-issues', project],
    queryFn: async () =>
      useInvoke('fetch_active_sprint_issues', {
        token,
        jiraInstance,
        sprintId: project?.activeSprintId,
      }),
    enabled: !!project,
  });

  useEffect(() => {
    if (data?.issues) {
      setIssueId(data.issues[0].id);
    }
  }, [data]);

  function renderIssues(categories: string[]) {
    const issues = data?.issues.filter(issue => categories.includes(issue.fields.status.name));
    if (!issues) return [];

    return issues.map(issue => (
      <IssueCard key={issue.id} type={issue.fields.status.id} issue={issue} />
    ));
  }

  // TODO: loading & error states
  if (error) return <pre>{error.message}</pre>;
  if (isLoading || !columns) return <div>Loading...</div>;

  const handleDrop = async (
    issue: SprintIssue,
    transition: TransitionValue,
    columnName: string
  ) => {
    mutation.mutate({ issue, transition, columnName });
  };

  function handleAccepts(column: BoardColumnConfigColumn) {
    const statusIds = columns.map(column => column.statuses.map(status => status.id).flat()).flat();
    const columnStatusIds = column.statuses.map(status => status.id);

    return statusIds.filter(statusId => !columnStatusIds.includes(statusId));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="-my-4 flex min-h-screen flex-col py-4">
        <div className="-mx-4 flex flex-1 gap-1 overflow-x-scroll px-4">
          {columns.map(column => (
            <Column
              accept={handleAccepts(column)}
              key={column.name}
              title={column.name}
              count={1}
              onDrop={item => handleDrop(item, column.transitions[0], column.transitions[0].name)}
            >
              {renderIssues(column.transitions?.map(transition => transition.name))}
            </Column>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
