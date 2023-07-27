export type Issue = {
  total: number;
  issues: SprintIssue[];
};

type SprintIssue = {
  id: string;
  key: string;
};
