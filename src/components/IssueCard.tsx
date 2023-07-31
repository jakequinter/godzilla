import type { FC } from 'react';
import { memo } from 'react';
import { useDrag } from 'react-dnd';

import type { SprintIssue } from 'types/issue';

type Props = {
  type: string;
  issue: SprintIssue;
};

export const IssueCard: FC<Props> = memo(function IssueCard({ type, issue }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: issue,
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [issue, type]
  );

  return (
    <div ref={drag} className="space-y-2 rounded border border-gray-200 bg-white p-2">
      <div className="flex items-center justify-between gap-x-2">
        <span className="inline-flex items-baseline gap-x-2 text-xs font-medium text-gray-400">
          <span>{issue.key}</span>
          <span className="rounded-full bg-gray-100 px-1.5 py-0.5">
            {issue.fields.customfield_10004 ?? '-'}
          </span>
        </span>

        {issue.fields.assignee?.avatarUrls['16x16'] && (
          <img
            className="h-5 w-5 rounded-full"
            src={issue.fields.assignee?.avatarUrls['16x16'] ?? ''}
          />
        )}
      </div>

      <p className="text-sm">{issue.fields.summary}</p>
    </div>
  );
});

export default IssueCard;
