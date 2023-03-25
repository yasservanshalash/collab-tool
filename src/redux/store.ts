import { configureStore } from '@reduxjs/toolkit';
import sortableContainerReducer from "../redux/slices/sortableContainersSlice"
const store = configureStore({
  reducer: {
    sortableContainers: sortableContainerReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;