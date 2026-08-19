import userEvent from "@testing-library/user-event";
import { act, fireEvent, render, screen } from "../../../test/renderWithTheme";
import { SearchBar } from "./SearchBar";

const getInput = () => screen.getByRole("textbox");

const advance = (ms: number) =>
  act(() => {
    jest.advanceTimersByTime(ms);
  });

const stubPlatform = (platform?: string) => {
  Object.defineProperty(navigator, "userAgentData", {
    value: platform === undefined ? undefined : { platform },
    configurable: true,
  });
};

afterEach(() => {
  stubPlatform(undefined);
});

describe("SearchBar value handling", () => {
  it("manages its own value when uncontrolled", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<SearchBar onChange={onChange} />);

    await user.type(getInput(), "ab");

    expect(getInput()).toHaveValue("ab");
    expect(onChange).toHaveBeenNthCalledWith(1, "a");
    expect(onChange).toHaveBeenNthCalledWith(2, "ab");
  });

  it("starts from defaultValue when uncontrolled", () => {
    render(<SearchBar defaultValue="asthma" />);

    expect(getInput()).toHaveValue("asthma");
  });

  it("lets the value prop win when controlled", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<SearchBar value="asthma" onChange={onChange} />);

    await user.type(getInput(), "x");

    expect(getInput()).toHaveValue("asthma");
    expect(onChange).toHaveBeenCalledWith("asthmax");
  });

  it("defaults the placeholder and lets it be overridden", () => {
    const { unmount } = render(<SearchBar />);

    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
    unmount();

    render(<SearchBar placeholder="Search datasets" />);

    expect(screen.getByPlaceholderText("Search datasets")).toBeInTheDocument();
  });
});

describe("SearchBar debounced search", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("holds onSearch until the default 300ms elapses", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    fireEvent.change(getInput(), { target: { value: "heart" } });

    advance(299);
    expect(onSearch).not.toHaveBeenCalledWith("heart");

    advance(1);
    expect(onSearch).toHaveBeenCalledWith("heart");
  });

  it("honours a custom debounceMs", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} debounceMs={1000} />);

    fireEvent.change(getInput(), { target: { value: "heart" } });

    advance(300);
    expect(onSearch).not.toHaveBeenCalledWith("heart");

    advance(700);
    expect(onSearch).toHaveBeenCalledWith("heart");
  });

  it("emits only the final value of a rapid burst", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    fireEvent.change(getInput(), { target: { value: "hea" } });
    advance(200);
    fireEvent.change(getInput(), { target: { value: "heart" } });
    advance(300);

    expect(onSearch).not.toHaveBeenCalledWith("hea");
    expect(onSearch).toHaveBeenCalledWith("heart");
  });

  it("searches immediately on Enter, without waiting for the debounce", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    fireEvent.change(getInput(), { target: { value: "heart" } });
    onSearch.mockClear();
    fireEvent.keyDown(getInput(), { key: "Enter" });

    expect(onSearch).toHaveBeenCalledWith("heart");
  });
});

describe("SearchBar clearing", () => {
  const clearButton = () =>
    screen.queryByRole("button", { name: "Clear search" });

  it("hides the clear button while the field is empty", () => {
    render(<SearchBar />);

    expect(clearButton()).not.toBeInTheDocument();
  });

  it("clears the field, notifies both callbacks and restores focus", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSearch = jest.fn();
    render(
      <SearchBar defaultValue="heart" onChange={onChange} onSearch={onSearch} />
    );

    await user.click(clearButton()!);

    expect(getInput()).toHaveValue("");
    expect(onChange).toHaveBeenCalledWith("");
    expect(onSearch).toHaveBeenCalledWith("");
    expect(getInput()).toHaveFocus();
  });

  it("leaves a controlled value to the consumer", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<SearchBar value="heart" onChange={onChange} />);

    await user.click(clearButton()!);

    expect(getInput()).toHaveValue("heart");
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("clears on Escape", () => {
    const onChange = jest.fn();
    render(<SearchBar defaultValue="heart" onChange={onChange} />);

    fireEvent.keyDown(getInput(), { key: "Escape" });

    expect(getInput()).toHaveValue("");
  });

  it("ignores Escape and hides the button when clearing is disabled", () => {
    render(<SearchBar defaultValue="heart" disableClear />);

    fireEvent.keyDown(getInput(), { key: "Escape" });

    expect(getInput()).toHaveValue("heart");
    expect(clearButton()).not.toBeInTheDocument();
  });

  it("shows a spinner instead of the clear button while loading", () => {
    render(<SearchBar defaultValue="heart" loading />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(clearButton()).not.toBeInTheDocument();
  });
});

describe("SearchBar keyboard shortcut", () => {
  it("focuses the input on ctrl+K off mac", () => {
    render(<SearchBar />);

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });

    expect(getInput()).toHaveFocus();
  });

  it("focuses the input on meta+K on mac", () => {
    stubPlatform("macOS");
    render(<SearchBar />);

    fireEvent.keyDown(window, { key: "k", metaKey: true });

    expect(getInput()).toHaveFocus();
  });

  it("ignores the other platform's modifier", () => {
    stubPlatform("macOS");
    render(<SearchBar />);

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });

    expect(getInput()).not.toHaveFocus();
  });

  it("does nothing when the shortcut is opted out of", () => {
    render(<SearchBar shortcut={false} />);

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });

    expect(getInput()).not.toHaveFocus();
  });

  it("stops listening once unmounted", () => {
    const removeEventListener = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<SearchBar />);

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
  });
});

describe("SearchBar slots", () => {
  it("renders consumer actions and filters", () => {
    render(
      <SearchBar
        actions={<button type="button">Go</button>}
        filters={<span data-testid="filter-chip" />}
      />
    );

    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
    expect(screen.getByTestId("filter-chip")).toBeInTheDocument();
  });

  it("renders no filter row when no filters are given", () => {
    render(<SearchBar />);

    expect(screen.queryByTestId("filter-chip")).not.toBeInTheDocument();
  });

  it("keeps a consumer endAdornment alongside the clear button", () => {
    render(
      <SearchBar
        defaultValue="heart"
        slotProps={{
          input: { endAdornment: <span data-testid="consumer-adornment" /> },
        }}
      />
    );

    expect(screen.getByTestId("consumer-adornment")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clear search" })
    ).toBeInTheDocument();
  });

  it("resolves a function-form input slot before merging", () => {
    render(
      <SearchBar
        defaultValue="heart"
        slotProps={{
          input: () => ({
            endAdornment: <span data-testid="consumer-adornment" />,
          }),
        }}
      />
    );

    expect(screen.getByTestId("consumer-adornment")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clear search" })
    ).toBeInTheDocument();
  });

  it("passes id and name through to the input", () => {
    render(<SearchBar id="dataset-search" name="q" />);

    expect(getInput()).toHaveAttribute("id", "dataset-search");
    expect(getInput()).toHaveAttribute("name", "q");
  });

  it("forks an inputRef supplied by the consumer", () => {
    const inputRef = { current: null as HTMLInputElement | null };
    render(<SearchBar inputRef={inputRef} />);

    expect(inputRef.current).toBe(getInput());
  });
});
