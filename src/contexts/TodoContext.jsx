import { createContext, useEffect, useState } from "react";

// 1. context 생성하기
export const TodoContext = createContext();

// LocalStorage 여러가지 값이 보관되므로 구분용 key가 필요함.
const TODO_LS_KEY = "todos";

// 예)
// UserContext.js : const UserContext = createContext();
// ThemeContext.js : const ThemeContext = createContext();
// LangContext.js : const LangContext = createContext();

// 2. Context를 활용한 Provider 생성하기
export const TodoProvider = ({ children }) => {
  // 3. 관리하고 싶은 state 및 state 를 업데이트 하는 기능 모아둠
  // const [countId, setCountId] = useState(0);
  const [todoList, setTodoList] = useState([]);

  const addTodo = formData => {
    const newTodoData = [...todoList, { ...formData, id: Date.now() }];
    setTodoList(newTodoData);
    // setCountId(prev => prev + 1);
    window.localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
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
    setTodoList([]);
  };

  // Context 가 화면에 출력될때 localStorage 에서 값을 읽어오는데
  // 키는 TODO_LS_KEY 에 담긴 값을 이용해 가져옮.
  useEffect(() => {
    // 웹브라우저 localStorage에 값을 읽어드림
    const todos = window.localStorage.getItem(TODO_LS_KEY);
    if (todos) {
      // 있을 때
      alert("Key가 Truthy 하네요 :)");
      // console.log(todos);
      // 글자를 js 에서 사용할 수 있도록 변환하자
      const datas = JSON.parse(todos);
      setTodoList([...datas]);
      // setCountId(datas);
    } else {
      // 없을 때
      alert("Key가 Falsy 하네요 :(");
      window.localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
      // setCountId(0);
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
