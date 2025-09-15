"use client";

import { useState, FormEvent } from "react";
import { useTodosContext } from "@/app/context/TodosProvider";

export const AddTodoForm = () => {
  const [text, setText] = useState("");
  const { dispatch } = useTodosContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", payload: { text } });
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-2"
      aria-label="Formularz dodawania"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nowe zadanie..."
        aria-label="Dodaj nowe zadanie"
        className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-slate-400"
        data-testid="add-todo-input"
      />
      <button
        disabled={!text.trim()}
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold cursor-pointer py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
      >
        Dodaj
      </button>
    </form>
  );
};
