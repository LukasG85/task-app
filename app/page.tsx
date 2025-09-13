import { AddTodoForm } from "@/app/components/AddTodoForm";
import { TodoList } from "@/app/components/TodoList";
import { TodosProvider } from "@/app/context/TodosProvider";
import { Filters } from "./components/Filters";

export default function HomePage() {
  return (
    <TodosProvider>
      <main className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Lista Zadań</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <AddTodoForm />
          <div className="mt-6">
            <Filters />
            <TodoList />
          </div>
        </div>
      </main>
    </TodosProvider>
  );
}
