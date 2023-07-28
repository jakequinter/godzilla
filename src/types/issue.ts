import { User } from './user';

export type Issue = {
  total: number;
  issues: SprintIssue[];
};

type SprintIssue = {
  id: string;
  key: string;
  fields: SprintIssueFields;
};

type SprintIssueFields = {
  assignee?: User;
  customfield_10004?: number;
  summary: string;
  status: SprintIssueStatus;
};

type SprintIssueStatus = {
  name: string;
};
