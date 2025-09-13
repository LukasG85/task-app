import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { TodoItem } from "./TodoItem";
import userEvent from "@testing-library/user-event";

describe("<TodoItem />", () => {
  const mockDispatch = vi.fn();
  const mockTodo = {
    id: "1",
    text: "Test todo",
    status: "planned" as const,
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the todo item with the correct text and initial status", () => {
    render(<TodoItem todo={mockTodo} dispatch={mockDispatch} />);

    const todoText = screen.getByText(mockTodo.text);
    expect(todoText).toBeInTheDocument();

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("planned");

    const removeButton = screen.getByRole("button", {
      name: `Usun ${mockTodo.text}`,
    });
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveAttribute("aria-label", "Usun Test todo");
  });

  it("should have a strike-through text and correct background for completed todos", () => {
    const completedTodo = { ...mockTodo, status: "completed" as const };
    render(<TodoItem todo={completedTodo} dispatch={mockDispatch} />);

    const todoText = screen.getByText(completedTodo.text);
    expect(todoText).toHaveClass("line-through");

    const todoItemContainer = screen
      .getByText(completedTodo.text)
      .closest("div");
    expect(todoItemContainer).toHaveClass("bg-gray-100");
  });

  it("should call dispatch with the correct payload when the remove button is clicked", async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} dispatch={mockDispatch} />);

    const removeButton = screen.getByRole("button", {
      name: `Usun ${mockTodo.text}`,
    });
    await user.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_TODO",
      payload: { id: mockTodo.id },
    });
  });

  it("should call dispatch with the correct payload when the status is changed", async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} dispatch={mockDispatch} />);

    const selectElement = screen.getByRole("combobox");
    await user.selectOptions(selectElement, "in-progress");

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_STATUS",
      payload: { id: mockTodo.id, status: "in-progress" },
    });
  });
});
