import { Todo, TodoStatus } from "@/app/types";

const STORAGE_KEY_TODOS = "nextjs-todos";
const STORAGE_KEY_FILTER = "nextjs-todos-filter";

export const getTodosFromStorage = (): Todo[] => {
  try {
    const todos = localStorage.getItem(STORAGE_KEY_TODOS);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error("Failed to get todos from localStorage", error);
    return [];
  }
};

export const setTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to set todos to localStorage", error);
  }
};

export const getFilterFromStorage = (): TodoStatus | "all" => {
  try {
    const filter = localStorage.getItem(STORAGE_KEY_FILTER);
    if (
      filter === "all" ||
      filter === "planned" ||
      filter === "in-progress" ||
      filter === "completed"
    ) {
      return filter;
    }
    return "all";
  } catch (error) {
    console.error("Failed to get filter from localStorage", error);
    return "all";
  }
};

export const setFilterToStorage = (filter: TodoStatus | "all"): void => {
  try {
    localStorage.setItem(STORAGE_KEY_FILTER, filter);
  } catch (error) {
    console.error("Failed to set filter to localStorage", error);
  }
};
