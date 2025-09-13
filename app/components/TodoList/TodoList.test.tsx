import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, Mock, afterEach } from "vitest";
import { TodoList } from "./TodoList";
import { useTodosContext } from "@/app/context/TodosProvider";
import { Todo } from "@/app/types";

vi.mock("@/app/context/TodosProvider", () => ({
  useTodosContext: vi.fn(),
}));

vi.mock("@/app/components/TodoItem", () => ({
  TodoItem: vi.fn(({ todo }) => (
    <div data-testid="todo-item-mock" data-todo-id={todo.id}>
      Mocked TodoItem
    </div>
  )),
}));

describe("<TodoList />", () => {
  const mockDispatch = vi.fn();
  const mockTodos: Todo[] = [
    { id: "1", text: "Test todo 1", status: "planned" },
    { id: "2", text: "Test todo 2", status: "in-progress" },
  ];

  const useTodosContextMock = useTodosContext as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the loading state correctly", () => {
    useTodosContextMock.mockReturnValue({
      filteredTodos: [],
      dispatch: mockDispatch,
      isLoading: true,
    });

    render(<TodoList />);

    const skeletonItems = screen.getAllByRole("listitem");
    expect(skeletonItems).toHaveLength(3);
    expect(
      screen.queryByText(/brak zadań. dodaj pierwsze!/i)
    ).not.toBeInTheDocument();
  });

  it("should render the empty state when no todos are available", () => {
    useTodosContextMock.mockReturnValue({
      filteredTodos: [],
      dispatch: mockDispatch,
      isLoading: false,
    });

    render(<TodoList />);

    expect(
      screen.getByText(/brak zadań. dodaj pierwsze!/i)
    ).toBeInTheDocument();
    expect(screen.queryAllByTestId("todo-item-mock")).toHaveLength(0);
  });

  it("should render the list of TodoItem components when todos are available", () => {
    useTodosContextMock.mockReturnValue({
      filteredTodos: mockTodos,
      dispatch: mockDispatch,
      isLoading: false,
    });

    render(<TodoList />);

    const todoItems = screen.getAllByTestId("todo-item-mock");
    expect(todoItems).toHaveLength(mockTodos.length);
    expect(
      screen.queryByText(/brak zadań. dodaj pierwsze!/i)
    ).not.toBeInTheDocument();

    expect(todoItems[0]).toHaveAttribute("data-todo-id", mockTodos[0].id);
    expect(todoItems[1]).toHaveAttribute("data-todo-id", mockTodos[1].id);
  });
});
