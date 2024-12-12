import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const ThemeContext = createContext();
const THEME_COOKIE = "theme_cookie";

export const ThemeProvider = ({ children }) => {
  // 쿠키
  const [cookies, setCookie] = useCookies(THEME_COOKIE);

  const handle_theme = () => {
    const nowTheme = theme === "gray" ? "hotpink" : "gray";
    setTheme(nowTheme);
    localStorage.setItem("theme", JSON.stringify(nowTheme));
    // 쿠키
    setCookie(THEME_COOKIE, nowTheme, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  const [theme, setTheme] = useState("gray");
  useEffect(() => {
    // 로컬 읽기
    const nowTheme = localStorage.getItem("Theme");
    // 쿠키 읽기
    const themeCookie = cookies[THEME_COOKIE];
    if (nowTheme) {
      setTheme(JSON.parse(nowTheme));
    } else {
      localStorage.getItem("theme", theme);
    }

    // 쿠키 초기화
    if (themeCookie) {
      setTheme(themeCookie);
    } else {
      // 쿠키
      setCookie(THEME_COOKIE, theme, {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, setTheme, handle_theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
