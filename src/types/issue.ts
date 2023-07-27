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
  customfield_10004?: number;
  summary: string;
  status: SprintIssueStatus;
};

type SprintIssueStatus = {
  name: string;
};
