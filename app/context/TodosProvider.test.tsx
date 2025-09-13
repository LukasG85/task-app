import { render, screen, cleanup, act } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, afterEach, Mock } from "vitest";
import { TodosProvider, useTodosContext } from "./TodosProvider";
import { useTodos } from "@/app/hooks/useTodos";
import {
  setFilterToStorage,
  getFilterFromStorage,
} from "@/app/utils/localStorage";
import { Todo } from "@/app/types";
import userEvent from "@testing-library/user-event";

vi.mock("@/app/hooks/useTodos", () => ({
  useTodos: vi.fn(),
}));

vi.mock("@/app/utils/localStorage", () => ({
  setFilterToStorage: vi.fn(),
  getFilterFromStorage: vi.fn(),
}));

const TestComponent = () => {
  const { todos, isLoading, filteredTodos, filter, setFilter, dispatch } =
    useTodosContext();
  return (
    <div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="todos-count">{todos.length}</div>
      <div data-testid="filtered-count">{filteredTodos.length}</div>
      <div data-testid="current-filter">{filter}</div>
      <button onClick={() => setFilter("completed")}>Set Filter</button>
    </div>
  );
};

describe("<TodosProvider />", () => {
  const useTodosMock = useTodos as Mock;
  const mockDispatch = vi.fn();
  const mockTodos: Todo[] = [
    { id: "1", text: "Test todo 1", status: "planned" },
    { id: "2", text: "Test todo 2", status: "in-progress" },
    { id: "3", text: "Test todo 3", status: "completed" },
  ];

  beforeEach(() => {
    useTodosMock.mockReturnValue({
      todos: mockTodos,
      dispatch: mockDispatch,
      isLoading: false,
    });
    vi.mocked(getFilterFromStorage).mockReturnValue("all");
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should provide context with initial values", () => {
    render(
      <TodosProvider>
        <TestComponent />
      </TodosProvider>
    );

    expect(screen.getByTestId("todos-count")).toHaveTextContent(
      mockTodos.length.toString()
    );
    expect(screen.getByTestId("filtered-count")).toHaveTextContent(
      mockTodos.length.toString()
    );
    expect(screen.getByTestId("current-filter")).toHaveTextContent("all");
    expect(screen.getByTestId("is-loading")).toHaveTextContent("false");
  });

  it("should filter todos correctly when the filter changes", async () => {
    const user = userEvent.setup();
    render(
      <TodosProvider>
        <TestComponent />
      </TodosProvider>
    );

    expect(screen.getByTestId("filtered-count")).toHaveTextContent("3");

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /set filter/i }));
    });

    expect(screen.getByTestId("filtered-count")).toHaveTextContent("1");
    expect(screen.getByTestId("current-filter")).toHaveTextContent("completed");
  });

  it("should load filter from localStorage on initial render", () => {
    vi.mocked(getFilterFromStorage).mockReturnValue("in-progress");
    render(
      <TodosProvider>
        <TestComponent />
      </TodosProvider>
    );

    expect(screen.getByTestId("current-filter")).toHaveTextContent(
      "in-progress"
    );
    expect(screen.getByTestId("filtered-count")).toHaveTextContent("1");
    expect(vi.mocked(getFilterFromStorage)).toHaveBeenCalled();
  });

  it("should save filter to localStorage when it changes", async () => {
    const user = userEvent.setup();
    render(
      <TodosProvider>
        <TestComponent />
      </TodosProvider>
    );

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /set filter/i }));
    });

    expect(vi.mocked(setFilterToStorage)).toHaveBeenCalledWith("completed");
  });

  it("should handle loading state correctly", () => {
    useTodosMock.mockReturnValue({
      todos: [],
      dispatch: mockDispatch,
      isLoading: true,
    });

    render(
      <TodosProvider>
        <TestComponent />
      </TodosProvider>
    );

    expect(screen.getByTestId("is-loading")).toHaveTextContent("true");
  });
});
