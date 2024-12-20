import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { LoginProvider } from "./contexts/LoginContext";
import { TodoProvider } from "./contexts/TodoContext";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TodoIndex from "./pages/todo/Index";
import TodoAdd from "./pages/todo/TodoAdd";
import TodoDetail from "./pages/todo/TodoDetail";
import TodoEdit from "./pages/todo/TodoEdit";

function App() {
  return (
    <TodoProvider>
      <Router>
        <LoginProvider>
          <Layout>
            <Routes>
              {/* 소개 */}
              <Route path="/" element={<About />} />
              {/* Todo 중첩 */}
              <Route path="/todo">
                <Route index element={<TodoIndex />}></Route>
                <Route path="add" element={<TodoAdd />}></Route>
                <Route path="detail" element={<TodoDetail />}></Route>
                <Route path="edit/:id" element={<TodoEdit />}></Route>
              </Route>
              {/* 잘못된 패스 */}
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Layout>
        </LoginProvider>
      </Router>
    </TodoProvider>
  );
}
export default App;
