import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './DraggableItem.module.css';

interface DraggableItemProps {
  id: string;
  text: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`${styles.item} ${isDragging ? styles.isDragging : ''}`}
    >
      {text}
    </div>
  );
};

export default DraggableItem;