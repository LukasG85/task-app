export type TodoStatus = "planned" | "in-progress" | "completed";

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
}

export type TodoAction =
  | { type: "ADD_TODO"; payload: { text: string } }
  | { type: "TOGGLE_STATUS"; payload: { id: string; status: TodoStatus } }
  | { type: "REMOVE_TODO"; payload: { id: string } }
  | { type: "LOAD_TODOS"; payload: { todos: Todo[] } };
