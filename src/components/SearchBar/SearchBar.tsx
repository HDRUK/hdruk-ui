import * as React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper,
  BoxProps,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDebounce } from "../../hooks/useDebounce";
import { isMacPlatform } from "../../utils/keyboard";

export interface SearchBarProps {
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
}

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
  name,
}: SearchBarProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const val = isControlled ? value! : internal;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounced = useDebounce(val, debounceMs);

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
        inputRef.current?.focus();
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
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch?.(val);
    if (e.key === "Escape" && !disableClear && val) handleClear();
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
          id={id}
          name={name}
          fullWidth
          inputRef={inputRef}
          autoFocus={autoFocus}
          size={size}
          value={val}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          variant="outlined"
          slotProps={{
            input: {
              endAdornment: (
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
                        <ClearIcon
                          fontSize={size === "small" ? "small" : "medium"}
                        />
                      </IconButton>
                    )
                  )}
                </InputAdornment>
              ),
            },
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
