// reducers/todoReducer.ts
import {ADD_TODO, UPDATE_TODO, DELETE_TODO} from '../action/types';
import {Todo} from '../types';

const initialState: Todo[] = [];

const todoReducer = (state = initialState, action: any) => {
  console.log('action>>', action);

  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id ? action.payload : todo,
      );
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

export default todoReducer;
