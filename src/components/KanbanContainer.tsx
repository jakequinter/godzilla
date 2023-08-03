import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';

import { Box } from './Box';
import { Dustbin } from './Dustbin';
import { ItemTypes } from './ItemTypes';

interface DustbinState {
  accepts: string[];
  lastDroppedItem: any;
}

interface BoxState {
  name: string;
  type: string;
}

export interface DustbinSpec {
  accepts: string[];
  lastDroppedItem: any;
}
export interface BoxSpec {
  name: string;
  type: string;
}
export interface ContainerState {
  droppedBoxNames: string[];
  dustbins: DustbinSpec[];
  boxes: BoxSpec[];
}

export const KanbanContainer: FC = memo(function KanbanContainer() {
  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
      lastDroppedItem: null,
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
  ]);

  const [boxes] = useState<BoxState[]>([
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([]);

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = item => {
    console.log('item', item);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {dustbins.map(({ accepts, lastDroppedItem }, index) => (
            <Dustbin
              accept={accepts}
              lastDroppedItem={lastDroppedItem}
              onDrop={item => handleDrop(item)}
              key={index}
            />
          ))}
        </div>

        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {boxes.map(({ name, type }, index) => (
            <Box name={name} type={type} isDropped={isDropped(name)} key={index} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
});
