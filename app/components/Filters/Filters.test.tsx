import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { Filters } from "./Filters";
import { useTodosContext } from "@/app/context/TodosProvider";
import userEvent from "@testing-library/user-event";

vi.mock("@/app/context/TodosProvider", () => ({
  useTodosContext: vi.fn(),
}));

describe("<Filters />", () => {
  const mockSetFilter = vi.fn();

  beforeEach(() => {
    vi.mocked(useTodosContext).mockReturnValue({
      todos: [],
      isLoading: false,
      filteredTodos: [],
      filter: "all",
      setFilter: mockSetFilter,
      dispatch: vi.fn(),
    });
    mockSetFilter.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render all filter buttons when not loading", () => {
    render(<Filters />);

    const allButton = screen.getByRole("button", { name: /wszystkie/i });
    const plannedButton = screen.getByRole("button", { name: /planowane/i });
    const inProgressButton = screen.getByRole("button", { name: /w trakcie/i });
    const completedButton = screen.getByRole("button", { name: /zakończone/i });

    expect(allButton).toBeInTheDocument();
    expect(plannedButton).toBeInTheDocument();
    expect(inProgressButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
  });

  it("should correctly mark the active button based on the filter value", () => {
    vi.mocked(useTodosContext).mockReturnValue({
      todos: [],
      isLoading: false,
      filteredTodos: [],
      filter: "in-progress",
      setFilter: mockSetFilter,
      dispatch: vi.fn(),
    });

    render(<Filters />);

    const allButtons = screen.getAllByRole("button");
    const inProgressButton = screen.getByRole("button", { name: /w trakcie/i });

    expect(inProgressButton).toHaveAttribute("aria-pressed", "true");

    const otherButtons = allButtons.filter((btn) => btn !== inProgressButton);
    otherButtons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-pressed", "false");
    });
  });

  it("should call setFilter with the correct value when a button is clicked", async () => {
    render(<Filters />);

    const plannedButton = screen.getByRole("button", { name: /planowane/i });
    await userEvent.click(plannedButton);

    expect(mockSetFilter).toHaveBeenCalledTimes(1);
    expect(mockSetFilter).toHaveBeenCalledWith("planned");
  });

  it("should display a loading state when isLoading is true", () => {
    vi.mocked(useTodosContext).mockReturnValue({
      todos: [],
      isLoading: true,
      filteredTodos: [],
      filter: "all",
      setFilter: mockSetFilter,
      dispatch: vi.fn(),
    });

    render(<Filters />);

    const skeletonElements = screen.getAllByTestId("button-skeleton");
    expect(skeletonElements.length).toBe(4);

    const allButtons = screen.queryAllByRole("button");
    expect(allButtons.length).toBe(0);
  });
});
