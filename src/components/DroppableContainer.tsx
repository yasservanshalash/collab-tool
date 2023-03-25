import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { sortableContainersActions } from '../redux/slices/sortableContainersSlice';
import DraggableItem from './DraggableItem';
import styles from './DroppableContainer.module.css';

interface DroppableContainerProps {
  id: string;
  items: string[];
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({ id, items }) => {
  const dispatch = useDispatch();
  const [newItemText, setNewItemText] = useState('');

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item: any) => {
      dispatch(sortableContainersActions.moveItem({ sourceId: item.id, destinationId: id }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleAddItem = () => {
    if (newItemText.trim() !== '') {
      dispatch(sortableContainersActions.createItem({ containerId: id, content: newItemText }));
      setNewItemText('');
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemText(e.target.value);
  };

  return (
    <div
      ref={drop}
      className={`${styles.container} ${isOver ? styles.isOver : ''}`}
      style={{position: "relative"}}
    >
        <div className={styles.list}>
        {items.map((item) => (
        <DraggableItem key={item} id={item} text={item} />
      ))}
        </div>
      <div style={{ display: 'flex', alignItems: 'center', position: "absolute", bottom: "10px", padding: "10px", gap: "10px"}}>
        <input
          type="text"
          value={newItemText}
          onChange={handleTextChange}
          placeholder="New item"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
};

export default DroppableContainer;