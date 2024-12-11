import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Header = () => {
  const { todoLogin, handleTodoLogin } = useContext(LoginContext);
  const { handle_theme } = useContext(ThemeContext);
  return (
    <header>
      <Link to={"/"}>Home</Link>
      <Link to={"/"}>About</Link>
      <Link to={"/todo"}>Todo</Link>
      <br />
      <button onClick={handleTodoLogin}>
        {todoLogin ? "로그아웃 하기" : "로그인 하기"}
      </button>
      <button onClick={handle_theme}>테마변경</button>
    </header>
  );
};
export default Header;
