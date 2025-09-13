"use client";

import { useReducer, useEffect, useState } from "react";
import { Todo } from "@/app/types";
import { todoReducer } from "@/app/reducers/todoReducer";
import {
  getTodosFromStorage,
  setTodosToStorage,
} from "@/app/utils/localStorage";

const initialTodos: Todo[] = [
  { id: "1", text: "Nauczyć się Next.js", status: "completed" },
  { id: "2", text: "Zrobić zakupy", status: "in-progress" },
  { id: "3", text: "Napisać kod", status: "planned" },
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
