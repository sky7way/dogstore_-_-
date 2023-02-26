import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserInfo from "./pages/UserInfo";
import { useSelector } from "react-redux";
import Cart from "./pages/Cart";

function App() {
  const token = useSelector((state) => state.user.token);

  const ProtectedRoute = ({ children }) => {
    if (token) {
      return children;
    } else {
      return <Navigate to={"/login"} />;
    }
  };

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" />
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<SignUp />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<SignIn />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
