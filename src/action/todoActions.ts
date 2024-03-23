// actions/todoActions.ts
import {ADD_TODO, UPDATE_TODO, DELETE_TODO} from './types';
import {Todo} from '../types';

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const updateTodo = (todo: Todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});
