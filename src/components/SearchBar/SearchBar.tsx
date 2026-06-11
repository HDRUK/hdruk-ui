import * as React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import type { BoxProps, TextFieldProps } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDebounce } from "../../hooks/useDebounce";
import { isMacPlatform } from "../../utils/keyboard";

type SearchBarTextFieldProps = Omit<
  TextFieldProps,
  | "autoFocus"
  | "defaultValue"
  | "id"
  | "name"
  | "onChange"
  | "onKeyDown"
  | "placeholder"
  | "size"
  | "value"
>;

type TextFieldSlotProps = NonNullable<TextFieldProps["slotProps"]>;
type TextFieldInputSlotProps = NonNullable<TextFieldSlotProps["input"]>;
type TextFieldInputSlotOwnerState = Parameters<
  Extract<TextFieldInputSlotProps, (...args: never[]) => unknown>
>[0];

export type SearchBarProps = SearchBarTextFieldProps & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
  autoFocus?: boolean;
  loading?: boolean;
  disableClear?: boolean;
  size?: "small" | "medium";
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  elevation?: number;
  boxSx?: BoxProps;
  shortcut?: boolean;
  id?: string;
  name?: string;
};

export function SearchBar({
  value,
  defaultValue,
  onChange,
  onSearch,
  debounceMs = 300,
  placeholder = "Search…",
  autoFocus,
  loading,
  disableClear,
  size = "medium",
  actions,
  filters,
  elevation = 0,
  boxSx,
  shortcut = true,
  id,
  inputRef,
  name,
  ...textFieldProps
}: SearchBarProps) {
  const { slotProps, ...restTextFieldProps } = textFieldProps;
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const val = isControlled ? value! : internal;

  const internalInputRef = React.useRef<HTMLInputElement>(null);
  const debounced = useDebounce(val, debounceMs);

  const setInputRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      // Update the internal ref (used for focusing and other internal logic)
      internalInputRef.current = node;

      // Update the external ref passed in props, supporting both callback refs and mutable ref objects
      if (typeof inputRef === "function") {
        inputRef(node);
      } else if (inputRef) {
        inputRef.current = node;
      }
    },
    [inputRef],
  );

  const stop = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (onSearch) onSearch(debounced);
  }, [debounced, onSearch]);

  React.useEffect(() => {
    if (!shortcut) return;
    const handler = (e: KeyboardEvent) => {
      if (
        (isMacPlatform() && e.metaKey && e.key.toLowerCase() === "k") ||
        (!isMacPlatform() && e.ctrlKey && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        internalInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcut]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handleClear = () => {
    if (!isControlled) setInternal("");
    onChange?.("");
    onSearch?.("");
    internalInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch?.(val);
    if (e.key === "Escape" && !disableClear && val) handleClear();
  };

  const searchAdornment = (
    <InputAdornment position="end">
      {loading ? (
        <CircularProgress size={size === "small" ? 16 : 18} />
      ) : (
        !disableClear &&
        val && (
          <IconButton
            aria-label="Clear search"
            onClick={handleClear}
            edge="end"
            size={size === "small" ? "small" : "medium"}
          >
            <CancelIcon fontSize={size === "small" ? "small" : "medium"} />
          </IconButton>
        )
      )}
    </InputAdornment>
  );

  const inputSlotProps = (ownerState: TextFieldInputSlotOwnerState) => {
    const resolvedInputSlotProps =
      typeof slotProps?.input === "function"
        ? slotProps.input(ownerState)
        : slotProps?.input;

    return {
      ...resolvedInputSlotProps,
      endAdornment: (
        <>
          {resolvedInputSlotProps?.endAdornment}
          {searchAdornment}
        </>
      ),
    };
  };

  return (
    <Box {...boxSx} sx={boxSx?.sx} onClick={stop}>
      <Paper
        elevation={elevation}
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1,
          borderRadius: theme.shape.borderRadius,
          ...(elevation === 0 && {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }),
        })}
      >
        <TextField
          {...restTextFieldProps}
          id={id}
          name={name}
          fullWidth
          inputRef={setInputRef}
          autoFocus={autoFocus}
          size={size}
          value={val}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          variant="outlined"
          slotProps={{
            ...slotProps,
            input: inputSlotProps,
          }}
        />
        {actions}
      </Paper>
      {filters && (
        <Box mt={1} display="flex" alignItems="center" gap={1} flexWrap="wrap">
          {filters}
        </Box>
      )}
    </Box>
  );
}

export default SearchBar;
