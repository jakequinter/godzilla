import type { BoardColumn } from '../types/project';
import type { Transition } from '../types/transition';

const matchTransitions = (boardConfig: BoardColumn, transitions: Transition) => {
  boardConfig.columnConfig.columns.forEach(column => {
    column.statuses.forEach(status => {
      const transitionMatched = transitions.transitions.find(
        transition => transition.to.id === status.id
      );

      if (transitionMatched) {
        column.transitionId = transitionMatched.id;
        column.transitionName = transitionMatched.name;
      }
    });
  });

  // You want to return the entire modified boardConfig
  return boardConfig;
};

export default matchTransitions;
