export type Project = {
  id: string;
  key: string;
  name: string;
  boardId: number;
  activeSprintId: number;
};

export type Board = {
  id: number;
};

export type Sprint = {
  id: number;
};

export type BoardColumn = {
  columnConfig: BoardColumnConfig;
};

type BoardColumnConfig = {
  columns: BoardColumnConfigColumn[];
};

type BoardColumnConfigColumn = {
  name: string;
  statuses: BoardColumnConfigColumnStatus[];
};

type BoardColumnConfigColumnStatus = {
  id: string;
};
