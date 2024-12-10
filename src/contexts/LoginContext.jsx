import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [todoLogin, setTodoLogin] = useState(false);
  const handleTodoLogin = () => {
    setTodoLogin(prevState => !prevState);
    console.log(todoLogin);
  };
  return (
    <LoginContext.Provider value={{ todoLogin, handleTodoLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
