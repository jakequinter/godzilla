import { TransitionValue } from './transition';

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

export type BoardColumnConfig = {
  columns: BoardColumnConfigColumn[];
};

export type BoardColumnConfigColumn = {
  name: string;
  statuses: BoardColumnConfigColumnStatus[];
  transitions?: TransitionValue[];
};

type BoardColumnConfigColumnStatus = {
  id: string;
};
