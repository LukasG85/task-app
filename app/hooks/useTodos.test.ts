import { renderHook, act } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { initialTodos, useTodos } from "./useTodos";
import {
  getTodosFromStorage,
  setTodosToStorage,
} from "@/app/utils/localStorage";
import { Todo } from "@/app/types";

vi.mock("@/app/utils/localStorage", () => ({
  getTodosFromStorage: vi.fn(),
  setTodosToStorage: vi.fn(),
}));

describe("useTodos()", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load todos from localStorage on initial render", async () => {
    const storedTodos: Todo[] = [
      { id: "4", text: "Zadanie z pamięci", status: "planned" },
    ];
    vi.mocked(getTodosFromStorage).mockReturnValue(storedTodos);

    const { result } = renderHook(() => useTodos());


    expect(vi.mocked(getTodosFromStorage)).toHaveBeenCalledTimes(1);
    expect(result.current.todos).toEqual(storedTodos);
    expect(result.current.isLoading).toBe(false);
  });

  it("should use initialTodos if localStorage is empty", async () => {
    vi.mocked(getTodosFromStorage).mockReturnValue([]);

    const { result } = renderHook(() => useTodos());


    expect(result.current.todos).toEqual(initialTodos);
    expect(result.current.isLoading).toBe(false);
  });

  it("should save todos to localStorage when they change", async () => {
    vi.mocked(getTodosFromStorage).mockReturnValue([]);
    const { result } = renderHook(() => useTodos());


    expect(vi.mocked(setTodosToStorage)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(setTodosToStorage)).toHaveBeenCalledWith(initialTodos);

    await act(async () => {
      result.current.dispatch({
        type: "ADD_TODO",
        payload: { text: "New todo" },
      });
    });

    expect(vi.mocked(setTodosToStorage)).toHaveBeenCalledTimes(2);
    expect(vi.mocked(setTodosToStorage)).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ text: "New todo" })])
    );
  });

  it("should handle isLoading state correctly", async () => {
    vi.mocked(getTodosFromStorage).mockReturnValue([]);
    const { result } = renderHook(() => useTodos());

    expect(result.current.isLoading).toBe(false);

    expect(result.current.isLoading).toBe(false);
  });
});
