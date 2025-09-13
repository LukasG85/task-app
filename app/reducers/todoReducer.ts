import { Todo, TodoAction } from "@/app/types";

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.payload.text,
          status: "planned",
        },
      ];
    case "TOGGLE_STATUS":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, status: action.payload.status }
          : todo
      );
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "LOAD_TODOS":
      return action.payload.todos;
    default:
      return state;
  }
};
