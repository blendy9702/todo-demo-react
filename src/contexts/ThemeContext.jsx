import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const handle_theme = () => {
    const nowTheme = theme === "green" ? "hotpink" : "green";
    setTheme(nowTheme);
    localStorage.setItem("theme", JSON.stringify(nowTheme));
  };

  const [theme, setTheme] = useState("green");
  useEffect(() => {
    const nowTheme = localStorage.getItem("Theme");
    if (nowTheme) {
      setTheme(JSON.parse(nowTheme));
    } else {
      localStorage.getItem("theme", theme);
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, setTheme, handle_theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
