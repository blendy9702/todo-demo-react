import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FaSteam } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { LuListTodo } from "react-icons/lu";
import { IoLogoReddit } from "react-icons/io";

const Header = () => {
  const { todoLogin, handleTodoLogin } = useContext(LoginContext);
  const { handle_theme } = useContext(ThemeContext);
  return (
    <header style={{ display: "flex" }}>
      <Link to={"/"} style={{ padding: "5px" }}>
        <FaSteam size={25} />
      </Link>
      <Link
        to={"/"}
        style={{ paddingLeft: "15px", display: "flex", alignItems: "center" }}
      >
        <ImTwitter size={25} />
        About
      </Link>
      <Link
        to={"/todo"}
        style={{ paddingLeft: "15px", display: "flex", alignItems: "center" }}
      >
        <LuListTodo size={25} />
        Todo
      </Link>
      <Link
        to={"/calendar"}
        style={{ paddingLeft: "15px", display: "flex", alignItems: "center" }}
      >
        스케쥴
      </Link>
      <Link
        to={"/range"}
        style={{ paddingLeft: "15px", display: "flex", alignItems: "center" }}
      >
        일정
      </Link>
      <Link
        to={"/member"}
        style={{ paddingLeft: "15px", display: "flex", alignItems: "center" }}
      >
        <Link to="/full">스케쥴러</Link>
        <IoLogoReddit size={25} />
        회원가입
      </Link>
      <Link
        to={"/login"}
        style={{ paddingLeft: "15px", display: "flex", alignItems: "center" }}
      >
        로그인
      </Link>
      <button
        onClick={() => handleTodoLogin(todoLogin)}
        style={{
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        {todoLogin ? "로그아웃 하기" : "로그인 하기"}
      </button>
      <button onClick={() => handle_theme()} style={{ borderRadius: "5px" }}>
        테마변경
      </button>
    </header>
  );
};
export default Header;
