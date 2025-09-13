import { describe, it, expect } from "vitest";
import { todoReducer } from "./todoReducer";
import { Todo } from "@/app/types";

Object.defineProperty(global.crypto, "randomUUID", {
  value: () => "mock-uuid-1",
  configurable: true,
});

describe("todoReducer()", () => {
  const initialState: Todo[] = [
    { id: "1", text: "Stworzyć testy dla reducera", status: "planned" },
    { id: "2", text: "Dodać nowe funkcje", status: "in-progress" },
  ];

  it("should add a new todo to the state", () => {
    const action = {
      type: "ADD_TODO",
      payload: { text: "Nowe zadanie" },
    } as const;
    const newState = todoReducer(initialState, action);

    expect(newState.length).toBe(3);
    expect(newState[2]).toEqual({
      id: "mock-uuid-1",
      text: "Nowe zadanie",
      status: "planned",
    });
  });

  it("should toggle the status of a todo", () => {
    const action = {
      type: "TOGGLE_STATUS",
      payload: { id: "1", status: "completed" },
    } as const;
    const newState = todoReducer(initialState, action);

    expect(newState[0].status).toBe("completed");
    expect(newState[1].status).toBe("in-progress");
  });

  it("should remove a todo from the state", () => {
    const action = {
      type: "REMOVE_TODO",
      payload: { id: "2" },
    } as const;
    const newState = todoReducer(initialState, action);

    expect(newState.length).toBe(1);
    expect(newState[0]).toEqual(initialState[0]);
  });

  it("should load todos from a payload", () => {
    const todosToLoad: Todo[] = [
      { id: "3", text: "Zadanie z pliku", status: "planned" },
      { id: "4", text: "Inne zadanie z pliku", status: "completed" },
    ];
    const action = {
      type: "LOAD_TODOS",
      payload: { todos: todosToLoad },
    } as const;
    const newState = todoReducer(initialState, action);

    expect(newState).toEqual(todosToLoad);
  });

  it("should return the current state for an unknown action type", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = todoReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
