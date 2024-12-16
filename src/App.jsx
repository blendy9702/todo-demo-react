import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { LoginProvider } from "./contexts/LoginContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TodoProvider } from "./contexts/TodoContext";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TodoIndex from "./pages/todo/Index";
import TodoAdd from "./pages/todo/TodoAdd";
import TodoDetail from "./pages/todo/TodoDetail";
import TodoEdit from "./pages/todo/TodoEdit";
import Join from "./pages/member/Join";
import LoginPage from "./pages/login/LoginPage";
import Schedule from "./pages/calendar/Schedule";
import RangeSchedule from "./pages/calendar/RangeSchedule";
import Full from "./pages/calendar/Full";

function App() {
  return (
    <TodoProvider>
      <Router>
        <LoginProvider>
          <ThemeProvider>
            <Layout>
              <Routes>
                {/* 소개 */}
                <Route path="/" element={<About />} />
                {/* 회원가입 */}
                <Route path="/member" element={<Join />} />
                <Route path="/login" element={<LoginPage />} />
                {/* 달력 */}
                <Route path="/calendar" element={<Schedule />} />
                <Route path="/range" element={<RangeSchedule />}></Route>
                <Route path="/full" element={<Full />}></Route>
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
          </ThemeProvider>
        </LoginProvider>
      </Router>
    </TodoProvider>
  );
}
export default App;
