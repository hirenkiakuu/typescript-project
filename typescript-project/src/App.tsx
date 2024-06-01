import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import { getToken } from "./utils/auth";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CreateUserPage from "./pages/CreateUserPage/CreateUserPage";

interface HomeRedirectProps {
  token: string | null;
}

const App : React.FC = () => {
  const token = getToken();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeRedirect token={token} />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/users/create-user" element={<CreateUserPage />} />
      </Routes>
    </>
  );
}

const HomeRedirect: React.FC<HomeRedirectProps> = ({ token }) => {
  return <Navigate to={token ? "/users" : "/register"} replace />;
};

export default App;
