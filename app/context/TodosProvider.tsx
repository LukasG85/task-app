"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useTodos } from "@/app/hooks/useTodos";
import { Todo, TodoAction, TodoStatus } from "@/app/types";
import {
  setFilterToStorage,
  getFilterFromStorage,
} from "@/app/utils/localStorage";

interface TodosContextType {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
  isLoading: boolean;
  filteredTodos: Todo[];
  filter: TodoStatus | "all";
  setFilter: (filter: TodoStatus | "all") => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const { todos, dispatch, isLoading } = useTodos();
  const [filter, setFilter] = useState<TodoStatus | "all">("all");

  useEffect(() => {
    const storedFilter = getFilterFromStorage();
    if (storedFilter) {
      setFilter(storedFilter);
    }
  }, []);

  useEffect(() => {
    setFilterToStorage(filter);
  }, [filter]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "all") {
        return true;
      }
      return todo.status === filter;
    });
  }, [todos, filter]);

  return (
    <TodosContext.Provider
      value={{ todos, dispatch, isLoading, filteredTodos, filter, setFilter }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }
  return context;
};
