import type { BoardColumn } from '../types/project';
import type { Transition } from '../types/transition';

const matchTransitions = (boardConfig: BoardColumn, transitions: Transition) => {
  boardConfig.columnConfig.columns.forEach(column => {
    // Initialize transitions array
    column.transitions = [];

    column.statuses.forEach(status => {
      const transitionMatched = transitions.transitions.filter(
        transition => transition.to.id === status.id
      );

      if (transitionMatched) {
        // Append matching transitions to the column
        column.transitions.push(...transitionMatched);
      }
    });
  });

  // You want to return the entire modified boardConfig
  return boardConfig;
};

export default matchTransitions;
