"use client";

import { useReducer, useEffect, useState } from "react";
import { Todo } from "@/app/types";
import { todoReducer } from "@/app/reducers/todoReducer";
import {
  getTodosFromStorage,
  setTodosToStorage,
} from "@/app/utils/localStorage";

export const initialTodos: Todo[] = [
  { id: "1", text: "Przeczytać jeden rozdział książki na temat rozwoju", status: "completed" },
  { id: "2", text: "Nauczyć się podstawowego zwrotu w nowym języku", status: "in-progress" },
  { id: "3", text: "Podlać wszystkie kwiaty", status: "planned" },
  { id: "4", text: "Zrobić zakupy", status: "planned" },
  { id: "5", text: "Iść na siłownię", status: "planned" },
];

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTodos = getTodosFromStorage();
    if (storedTodos.length > 0) {
      dispatch({ type: "LOAD_TODOS", payload: { todos: storedTodos } });
    } else {
      dispatch({ type: "LOAD_TODOS", payload: { todos: initialTodos } });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      setTodosToStorage(todos);
    }
  }, [todos]);

  return { todos, dispatch, isLoading };
};
