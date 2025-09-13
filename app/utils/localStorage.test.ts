import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getTodosFromStorage,
  setTodosToStorage,
  getFilterFromStorage,
  setFilterToStorage,
} from "./localStorage";
import { Todo } from "@/app/types";

const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(global, "localStorage", { value: localStorageMock });

describe("localStorage utilities", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("todos storage", () => {
    it("should get an empty array if no todos are in storage", () => {
      const todos = getTodosFromStorage();
      expect(todos).toEqual([]);
      expect(localStorageMock.getItem).toHaveBeenCalledWith("nextjs-todos");
    });

    it("should get todos from storage", () => {
      const mockTodos: Todo[] = [
        { id: "1", text: "Test todo", status: "planned" },
      ];
      localStorageMock.setItem("nextjs-todos", JSON.stringify(mockTodos));

      const todos = getTodosFromStorage();
      expect(todos).toEqual(mockTodos);
    });

    it("should save todos to storage", () => {
      const mockTodos: Todo[] = [
        { id: "1", text: "Another test todo", status: "completed" },
      ];
      setTodosToStorage(mockTodos);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "nextjs-todos",
        JSON.stringify(mockTodos)
      );
    });

    it("should handle invalid JSON gracefully", () => {
      localStorageMock.setItem("nextjs-todos", "invalid-json");
      const todos = getTodosFromStorage();
      expect(todos).toEqual([]);
    });

    it("should handle localStorage errors gracefully when getting todos", () => {
      localStorageMock.getItem.mockImplementationOnce(() => {
        throw new Error("Test error");
      });
      const todos = getTodosFromStorage();
      expect(todos).toEqual([]);
    });

    it("should handle localStorage errors gracefully when setting todos", () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error("Test error");
      });
      const mockTodos: Todo[] = [
        { id: "1", text: "Error test", status: "planned" },
      ];
      expect(() => setTodosToStorage(mockTodos)).not.toThrow();
    });
  });

  describe("filter storage", () => {
    it("should get 'all' filter if no filter is in storage", () => {
      const filter = getFilterFromStorage();
      expect(filter).toBe("all");
    });

    it("should get a valid filter from storage", () => {
      localStorageMock.setItem("nextjs-todos-filter", "in-progress");
      const filter = getFilterFromStorage();
      expect(filter).toBe("in-progress");
    });

    it("should return 'all' for an invalid filter in storage", () => {
      localStorageMock.setItem("nextjs-todos-filter", "invalid-filter");
      const filter = getFilterFromStorage();
      expect(filter).toBe("all");
    });

    it("should save a filter to storage", () => {
      setFilterToStorage("completed");
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "nextjs-todos-filter",
        "completed"
      );
    });

    it("should handle localStorage errors gracefully when getting filter", () => {
      localStorageMock.getItem.mockImplementationOnce(() => {
        throw new Error("Test error");
      });
      const filter = getFilterFromStorage();
      expect(filter).toBe("all");
    });

    it("should handle localStorage errors gracefully when setting filter", () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error("Test error");
      });
      expect(() => setFilterToStorage("all")).not.toThrow();
    });
  });
});
