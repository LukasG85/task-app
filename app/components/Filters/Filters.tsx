"use client";

import { useTodosContext } from "@/app/context/TodoContext";
import { TodoStatus } from "@/app/types";

const filtersData: {
  id: number;
  label: string;
  value: TodoStatus | "all";
}[] = [
  { id: 1, label: "Wszystkie", value: "all" },
  { id: 2, label: "Planowane", value: "planned" },
  { id: 3, label: "W trakcie", value: "in-progress" },
  { id: 4, label: "Zakończone", value: "completed" },
];

export const Filters = () => {
  const { filter, setFilter, isLoading } = useTodosContext();

  if (isLoading) {
    return (
      <div className="flex justify-center gap-4 mb-4">
        {[...Array(filtersData.length)].map((_, index) => (
          <div
            key={index}
            className="h-[40px] w-[120px] px-4 py-2 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      {filtersData.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.value)}
          className={`min-w-[120px] flex-1 px-4 py-2 rounded-lg cursor-pointer transition duration-300 ${
            filter === f.value
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};
