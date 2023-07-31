import type { FC } from 'react';
import { memo } from 'react';
import { useDrop } from 'react-dnd';

type Props = {
  title: string;
  count: number;
  accept: string[];
  onDrop: (item: any) => void;
  children: React.ReactNode;
};

export const Column: FC<Props> = memo(function Column({ title, count, accept, onDrop, children }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div ref={drop} className="flex min-w-[200px] flex-1 flex-col">
      <p>{`This column accepts: ${accept.join(', ')}`}</p>
      <span className="inline-flex gap-x-2 text-xs font-medium text-gray-700">
        {title}
        <span className="text-gray-400">{count}</span>
      </span>
      <div className="mt-2 flex flex-1 flex-col space-y-2 rounded-md">{children}</div>
    </div>
  );
});

export default Column;
