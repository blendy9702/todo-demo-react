import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
// 1. context 생성하기
export const TodoContext = createContext();
// LocalStorage 여러가지 값이 보관되므로 구분용 key가 필요함.
const TODO_LS_KEY = "todos";
const TODO_COOKIE_NAME = "todos_cookie";
// 예)
// UserContext.js : const UserContext = createContext();
// ThemeContext.js : const ThemeContext = createContext();
// LangContext.js : const LangContext = createContext();

// 2. Context를 활용한 Provider 생성하기
export const TodoProvider = ({ children }) => {
  // 쿠키 라이브러리 사용

  const [cookies, setCookie, removeCookie] = useCookies([TODO_COOKIE_NAME]);

  // 3. 관리하고 싶은 state 및 state 를 업데이트 하는 기능 모아둠
  // const [countId, setCountId] = useState(0);
  const [todoList, setTodoList] = useState([]);

  const addTodo = formData => {
    const newTodoData = [...todoList, { ...formData, id: Date.now() }];
    setTodoList(newTodoData);
    // 로컬에 저장함 (합당)
    window.localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
    // 쿠키에 저장함 (서버연동 보관이 아니라서 비추)
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  // todoList의 State 가 바뀌면 실행하고 싶은게 있다
  useEffect(() => {
    // LocalStorage에 보관하자
    // window.localStorage.setItem(TODO_LS_KEY, JSON.stringify([...todoList]));
    return () => {};
  }, [todoList]);

  // todoList 에서 특정 todo를 제거하는 기능
  const deleteTodo = id => {
    // 할일 목록 한개를 삭제하기
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    // 로컬삭제
    window.localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newList]));
    // 쿠키에 저장함 (서버연동 보관이 아니라서 비추)
    setCookie(TODO_COOKIE_NAME, newList, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
    alert(`${id} 삭제 완료.`);
  };
  // todoList 에서 특정 todo를 수정하는 기능
  const updateTodo = formData => {
    // console.log("formData ", formData);

    const newTodoData = todoList.map(item => {
      if (formData.id === item.id) {
        return formData;
      } else {
        return item;
      }
    });

    setTodoList(newTodoData);
  };

  const resetTodo = () => {
    localStorage.clear(TODO_LS_KEY);
    removeCookie(TODO_COOKIE_NAME);
    setTodoList([]);
  };

  // Context 가 화면에 출력될때 localStorage 에서 값을 읽어오는데
  // 키는 TODO_LS_KEY 에 담긴 값을 이용해 가져옮.
  useEffect(() => {
    // 로컬 자료 읽기
    // 웹브라우저 localStorage에 값을 읽어드림
    const todos = window.localStorage.getItem(TODO_LS_KEY);

    // 쿠키 읽기
    const todosCookie = cookies[TODO_COOKIE_NAME];
    // if (todos) {
    //   // 있을 때
    //   alert("Key가 Truthy 하네요 :)");
    //   // 글자를 js 에서 사용할 수 있도록 변환하자
    //   const datas = JSON.parse(todos);
    //   setTodoList([...datas]);
    // } else {
    //   // 없을 때
    //   alert("Key가 Falsy 하네요 :(");
    //   window.localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
    // }

    if (todosCookie) {
      setTodoList(todosCookie);
    } else {
      setCookie(TODO_COOKIE_NAME, [], { path: "/", maxAge: 1 * 24 * 60 * 60 });
    }
    return () => {};
  }, []);

  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, deleteTodo, updateTodo, resetTodo }}
    >
      {/* 컴포넌트를 children으로 주입 받는다. */}
      {children}
    </TodoContext.Provider>
  );
};
//  4. Provider 에 value 에 원하는 기능 및 state 르 전달

// 예)
// export const UserProvider = () => {};
// export const ThemeProvider = () => {};
// export const LangProvider = () => {};
