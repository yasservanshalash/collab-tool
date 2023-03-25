import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';

import DroppableContainer from './components/DroppableContainer';
import { sortableContainersActions } from './redux/slices/sortableContainersSlice';

function App() {
  const containers = useSelector((state: RootState) => state.sortableContainers);
  const dispatch = useDispatch();

  const handleAddContainer = () => {
    dispatch(sortableContainersActions.createContainer());
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {containers.map((container) => (
          <DroppableContainer key={container.id} id={container.id} items={container.items} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <button onClick={handleAddContainer}>Add Container</button>
      </div>
    </div>
  );
}

export default App;