"use client";

import { useState, FormEvent } from "react";
import { useTodosContext } from "@/app/context/TodoContext";

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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nowe zadanie..."
        aria-label="Add new todo"
        className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-slate-400"
      />
      <button
        disabled={!text.trim()}
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold cursor-pointer py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
      >
        Dodaj
      </button>
    </form>
  );
};
