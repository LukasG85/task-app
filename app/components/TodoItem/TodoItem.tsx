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
      className={`flex flex-col md:flex-row items-center gap-4 p-4 border border-slate-200 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:shadow-lg ${todo.status === "in-progress" && "bg-green-100 hover:bg-green-200"
        } ${todo.status === "planned" && "bg-orange-100 hover:bg-orange-200"} ${todo.status === "completed" && "bg-gray-100 hover:bg-gray-200"
        }`}
    >
      <span
        className={`flex-grow ${todo.status === "completed" ? "line-through text-gray-500 " : ""
          }`}
      >
        {todo.text}
      </span>
      <div className="flex gap-2">
        <select
          value={todo.status}
          onChange={handleChangeStatus}
          className={`h-[40px] p-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${todo.status === "in-progress" && "bg-green-200 hover:bg-green-300"
            } ${todo.status === "planned" && "bg-orange-200 hover:bg-orange-300"} ${todo.status === "completed" && "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          <option value="planned">Planowane</option>
          <option value="in-progress">W trakcie</option>
          <option value="completed">Zakończone</option>
        </select>

        <button
          onClick={handleRemove}
          className="bg-red-400 text-white p-2 rounded hover:bg-red-600 cursor-pointer transition"
          aria-label={`Usun ${todo.text}`}
        >
          Usuń
        </button>
      </div>
    </div>
  );
};
