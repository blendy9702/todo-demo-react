import { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";

const Footer = ({ children }) => {
  const { resetTodo } = useContext(TodoContext);
  return (
    <div>
      <button
        onClick={() => {
          resetTodo();
        }}
      >
        초기화를 해주마 :D
      </button>
      {children}
    </div>
  );
};
export default Footer;
