import { useEffect } from "react";
import TodoItem from "../../components/todo/TodoItem";
import { useNavigate } from "react-router-dom";

const TodoIndex = ({ todoList, setTodoList }) => {
  console.log(todoList);
  // useState 를 이용해서 map 으로 출력하기.
  // useEffect 를 이용해서 할일 목록을 불러오기.
  const deleteTodo = id => {
    // 할일 목록 한개를 삭제하기
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    alert(`${id} 삭제 완료.`);
  };

  const handleClickAdd = () => {
    const navigate = useNavigate();
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <h1>할일 목록</h1>
      <div>
        <ul>
          {todoList.map(item => {
            return (
              <li key={item.id}>
                <TodoItem item={item} deleteTodo={deleteTodo} />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            handleClickAdd(navigate);
          }}
        >
          추가하기
        </button>
      </div>
    </div>
  );
};

export default TodoIndex;
