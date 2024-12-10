import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

const Header = () => {
  const { todoLogin, handleTodoLogin } = useContext(LoginContext);
  return (
    <header>
      <Link to={"/"}>Home</Link>
      <Link to={"/"}>About</Link>
      <Link to={"/todo"}>Todo</Link>
      <br />
      <button onClick={handleTodoLogin}>
        {todoLogin ? "로그아웃" : "로그인"}
      </button>
    </header>
  );
};
export default Header;
