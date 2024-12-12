import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const LS_LOGIN = "login";
const LS_LOGIN_SS = "login_SS";
const LS_LOGIN_COOKIE = "login_cookie";

export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
  const [todoLogin, setTodoLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([LS_LOGIN_COOKIE]);

  const handleTodoLogin = flag => {
    setTodoLogin(prevState => {
      const newState = !prevState;
      localStorage.setItem(LS_LOGIN, JSON.stringify(newState));
      return newState;
    });
    // 로컬
    localStorage.setItem(LS_LOGIN, JSON.stringify(!flag));
    // 세션
    sessionStorage.setItem(LS_LOGIN_SS, JSON.stringify(!flag));
    // 쿠키
    setCookie(LS_LOGIN_COOKIE, !flag, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  useEffect(() => {
    // 로컬읽기
    const flag = localStorage.getItem(LS_LOGIN);
    // 세션읽기
    const flagSS = sessionStorage.getItem(LS_LOGIN_SS);
    // 쿠키읽기
    const flagCookie = cookies[LS_LOGIN_COOKIE];

    // 로컬
    if (flag) {
      setTodoLogin(JSON.parse(flag));
    } else {
      localStorage.setItem(LS_LOGIN, JSON.stringify(false));
    }

    // 세션
    if (flagSS) {
      setTodoLogin(JSON.parse(flagSS));
    } else {
      sessionStorage.setItem(LS_LOGIN_SS, JSON.stringify(false));
    }

    // 쿠키 초기화
    if (flagCookie) {
      setTodoLogin(flagCookie);
    } else {
      // 쿠키
      setCookie(LS_LOGIN_COOKIE, false, {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
  }, []);

  return (
    <LoginContext.Provider value={{ todoLogin, handleTodoLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
