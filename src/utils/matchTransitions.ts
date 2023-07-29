import type { BoardColumn } from '../types/project';
import type { Transition } from '../types/transition';

const matchTransitions = (boardConfig: BoardColumn, transitions: Transition) => {
  boardConfig.columnConfig.columns.forEach(column => {
    column.transitions = [];

    column.statuses.forEach(status => {
      const transitionMatched = transitions.transitions.filter(
        transition => transition.to.id === status.id
      );

      if (transitionMatched) {
        column.transitions.push(...transitionMatched);
      }
    });
  });

  return boardConfig;
};

export default matchTransitions;
