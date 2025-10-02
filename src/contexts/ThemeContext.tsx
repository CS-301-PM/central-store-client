import React, { createContext, useContext, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

export type ThemeMode = "light" | "dark";

type ThemeContextType = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("app_theme_mode");
    return (saved as ThemeMode) || "light";
  });

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("app_theme_mode", next);
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: true,
        colorSchemes: {
          light: true,
          dark: true,
        },
        palette: { mode },
        shape: { borderRadius: 10 },
        typography: {
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, " +
            "Apple Color Emoji, Segoe UI Emoji",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};