import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './reducer/todoReducer';
import {Todo} from './types';

export interface RootState {
  todos: Todo[];
}

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
