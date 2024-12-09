import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const initTodo = {
  id: 0,
  title: "",
  content: "",
  author: "",
  date: "",
  complete: 0,
  privacy: 0,
};
const TodoEdit = ({ todoList, setTodoList }) => {
  // useState 화면 리랜더링
  const [formData, setFormData] = useState(initTodo);
  // params 로 id 를 추출
  const { id } = useParams();
  const navigate = useNavigate();

  const getTodo = () => {
    const findData = todoList.filter(item => item.id === parseInt(id));
    // console.log(findData);
    const findTodo = findData[0];
    // console.log(findTodo);
    setFormData({ ...findTodo });
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const postData = () => {
    const newTodoData = todoList.map(item => {
      if (formData.id === item.id) {
        return formData;
      } else {
        return item;
      }
    });
    setTodoList(newTodoData);
  };

  const handleSubmit = e => {
    // 새로고침 하면 안됨
    e.preventDefault();
    postData();
    alert("내용 수정 완료.");
    navigate(`/todo/detail?id=${formData.id}`);
  };

  const handleClickBack = () => {
    navigate(`/todo/detail?id=${formData.id}`);
  };

  // useEffect 에서 id를 이용해 내용 추출
  useEffect(() => {
    getTodo();
    return () => {};
  }, []);
  return (
    <div>
      <h1>TodoEdit</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="author">작성자</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          id="author"
          readOnly
          disabled
        />
        <br />
        <label>
          제목
          <input
            type="text"
            name="title"
            value={formData.title}
            id="title"
            onChange={e => handleChange(e)}
          />
          <br />
        </label>
        <label htmlFor="">내용</label>
        <textarea
          name="content"
          id="content"
          value={formData.content}
          onChange={e => handleChange(e)}
        />
        <br />
        <label htmlFor="">날자</label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={e => handleChange(e)}
        />
        <br />
        <label htmlFor="">완료여부</label>
        <input
          type="checkbox"
          name="complete"
          id="complete"
          // value={formData.complete}
          checked={formData.complete === 1 ? true : false}
          onChange={e => handleChange(e)}
        />
        <br />
        <label htmlFor="">공개여부</label>
        <input
          type="checkbox"
          name="privacy"
          id="privacy"
          // value={formData.privacy}
          checked={formData.privacy === 1 ? true : false}
          onChange={e => handleChange(e)}
        />
        <br />
        <div>
          <button type="submit">수정하기</button>
          <button
            type="button"
            onClick={() => {
              handleClickBack();
            }}
          >
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoEdit;
