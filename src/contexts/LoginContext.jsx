import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();
const LS_LOGIN = "login";

export const LoginProvider = ({ children }) => {
  const [todoLogin, setTodoLogin] = useState(false);

  const handleTodoLogin = () => {
    setTodoLogin(prevState => {
      const newState = !prevState;
      localStorage.setItem(LS_LOGIN, JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const stateChanger = localStorage.getItem(LS_LOGIN);
    if (stateChanger !== null) {
      setTodoLogin(JSON.parse(stateChanger));
    } else {
      localStorage.setItem(LS_LOGIN, JSON.stringify(false));
    }
  }, []);

  return (
    <LoginContext.Provider value={{ todoLogin, handleTodoLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
