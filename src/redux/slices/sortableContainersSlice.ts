import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Container {
  id: string;
  items: string[];
}

const initialState: Container[] = [
  { id: 'container-1', items: ['item-1-1', 'item-1-2', 'item-1-3'] },
  { id: 'container-2', items: ['item-2-1', 'item-2-2', 'item-2-3'] },
];

const sortableContainersSlice = createSlice({
  name: 'sortableContainers',
  initialState,
  reducers: {
    moveItem: (
        state,
        action: PayloadAction<{
          sourceId: string;
          destinationId: string;
        }>
      ) => {
        const { sourceId, destinationId } = action.payload;
      
        const sourceContainer = state.find((container) => container.items.includes(sourceId));
        const destinationContainer = state.find((container) => container.id === destinationId);
      
        if (sourceContainer && destinationContainer) {
          const sourceItemIndex = sourceContainer.items.findIndex((item) => item === sourceId);
          sourceContainer.items.splice(sourceItemIndex, 1);
      
          destinationContainer.items.push(sourceId);
        }
      },
      createContainer: (state) => {
        state.push({
          id: uuidv4(),
          items: [],
        });
      },
      createItem: (state, action: PayloadAction<{ containerId: string; content: string }>) => {
        const { containerId, content } = action.payload;
        const container = state.find((container) => container.id === containerId);
        if (container) {
          container.items.push(content);
        }
      },
  },
});

export const sortableContainersActions = sortableContainersSlice.actions;

const sortableContainerReducer = sortableContainersSlice.reducer
export default sortableContainerReducer