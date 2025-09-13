import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { AddTodoForm } from "./AddTodoForm";
import { useTodosContext } from "@/app/context/TodosProvider";
import userEvent from "@testing-library/user-event";

vi.mock("@/app/context/TodosProvider", () => ({
  useTodosContext: vi.fn(),
}));

describe("<AddTodoForm />", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useTodosContext).mockReturnValue({
      dispatch: mockDispatch,
      todos: [],
      isLoading: false,
      filteredTodos: [],
      filter: "all",
      setFilter: vi.fn(),
    });
    mockDispatch.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the form with a text field and a button", () => {
    render(<AddTodoForm />);

    const inputElement = screen.getByRole("textbox", {
      name: /dodaj nowe zadanie/i,
    });
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: /dodaj/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should update the text field value when the user types", async () => {
    const user = userEvent.setup();
    render(<AddTodoForm />);
    const inputElement = screen.getByRole("textbox", {
      name: /dodaj nowe zadanie/i,
    });
    const testText = "Test task";

    await user.type(inputElement, testText);

    expect(inputElement).toHaveValue(testText);
  });

  it("should have the Add button disabled initially", () => {
    render(<AddTodoForm />);
    const buttonElement = screen.getByRole("button", { name: /dodaj/i });

    expect(buttonElement).toBeDisabled();
  });

  it("should enable the Add button after entering text", async () => {
    const user = userEvent.setup();
    render(<AddTodoForm />);
    const inputElement = screen.getByRole("textbox", {
      name: /dodaj nowe zadanie/i,
    });
    const buttonElement = screen.getByRole("button", { name: /dodaj/i });

    await user.type(inputElement, "New task");

    expect(buttonElement).toBeEnabled();
  });

  it("should call dispatch and clear the field when the form is submitted correctly", async () => {
    const user = userEvent.setup();
    render(<AddTodoForm />);
    const inputElement = screen.getByRole("textbox", {
      name: /dodaj nowe zadanie/i,
    });
    const buttonElement = screen.getByRole("button", { name: /dodaj/i });

    const todoText = "Buy groceries";

    await user.type(inputElement, todoText);
    await user.click(buttonElement);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_TODO",
      payload: { text: todoText },
    });

    expect(inputElement).toHaveValue("");
  });

  it("should not call dispatch when the form is empty", async () => {
    const user = userEvent.setup();
    render(<AddTodoForm />);
    const buttonElement = screen.getByRole("button", { name: /dodaj/i });

    await user.click(buttonElement);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
