import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TODO_MOCK_DATA } from "../../constants/mockdata";

const TodoDetail = ({ todoList, setTodoList }) => {
  // js 로 패스 이동하기
  const navigate = useNavigate();
  // SearchParams 를 이용하기

  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id"));
  const [todo, setTodo] = useState({});

  const getTodo = () => {
    // id를 이영해서 state 에서 필요한 내용을 추출
    const findData = todoList.filter(item => item.id === id);
    const findTodo = findData[0];
    // 이후 setTodo에 담아서 화면 리랜더링 출력
    setTodo({ ...findTodo });
  };

  const handleClickEdit = () => {
    // Link 말고 js 로 이동하기
    // Link 는 a 태그로 이동하는 것
    navigate(`/todo/edit/${todo.id}`);
  };

  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div>
      <h1>TodoDetail</h1>
      <div>
        {/* 작성자 */}
        작성자 : {todo.author}
        {/* 날자 */}
        작성자 : {todo.date}
        {/* 제목 */}
        작성자 : {todo.title}
        {/* 내용 */}
        작성자 : {todo.content}
      </div>
      <div>
        <button
          onClick={() => {
            handleClickEdit();
          }}
        >
          수정하기
        </button>
        <button
          onClick={() => {
            navigate("/todo");
          }}
        >
          목록보기
        </button>
      </div>
    </div>
  );
};

export default TodoDetail;
