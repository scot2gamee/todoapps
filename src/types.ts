export interface Todo {
  id: number;
  title: string;
  description: string;
  duedate: Date;
  subtask: Subtask[];
}

export interface Subtask {
  id: number;
  text: string;
}

export interface TodoState {
  todos: Todo[];
}
