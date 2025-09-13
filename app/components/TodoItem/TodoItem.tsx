"use client";

import { Todo, TodoStatus, TodoAction } from "@/app/types";

interface TodoItemProps {
  todo: Todo;
  dispatch: React.Dispatch<TodoAction>;
}

export const TodoItem = ({ todo, dispatch }: TodoItemProps) => {
  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "TOGGLE_STATUS",
      payload: { id: todo.id, status: e.target.value as TodoStatus },
    });
  };

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_TODO",
      payload: { id: todo.id },
    });
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 border border-slate-200 rounded-lg shadow-md transition duration-500 ease-in-out transform hover:shadow-lg ${
        todo.status === "in-progress" && "bg-green-100"
      } ${todo.status === "planned" && "bg-orange-100"} ${
        todo.status === "completed" && "bg-gray-100"
      }`}
    >
      <span
        className={`flex-grow ${
          todo.status === "completed" ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </span>
      <select
        value={todo.status}
        onChange={handleChangeStatus}
        className="p-2 border border-slate-200 rounded-lg cursor-pointer"
      >
        <option value="planned">Planowane</option>
        <option value="in-progress">W trakcie</option>
        <option value="completed">Zakończone</option>
      </select>

      <button
        onClick={handleRemove}
        className="bg-red-400 text-white p-2 rounded hover:bg-red-600 cursor-pointer transition"
      >
        Usuń
      </button>
    </div>
  );
};
