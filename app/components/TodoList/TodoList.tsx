"use client";

import { useTodosContext } from "@/app/context/TodosProvider";
import { TodoItem } from "@/app/components/TodoItem";

export const TodoList = () => {
  const { filteredTodos, dispatch, isLoading } = useTodosContext();

  if (filteredTodos.length === 0 && !isLoading) {
    return (
      <p className="text-gray-500 text-center mt-4">
        Brak zadań. Dodaj pierwsze!
      </p>
    );
  }

  if (isLoading) {
    return (
      <ul className="space-y-4">
        {[1, 2, 3].map((item) => (
          <li key={item}>
            <div
              className={`h-[70px] flex items-center gap-4 p-4 border border-slate-200 rounded-lg shadow-md bg-gray-100 transition duration-500 ease-in-out transform hover:shadow-lg`}
            ></div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-4">
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} dispatch={dispatch} />
        </li>
      ))}
    </ul>
  );
};
