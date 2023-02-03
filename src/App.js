import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserInfo from "./pages/UserInfo";

function App() {
  // const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (localStorage.getItem("token")) {
      return children;
    } else {
      return <Navigate to={"/login"} />;
    }
    // if (!currentUser) {
    //   return <Navigate to={"/login"} />;
    // }
    // return children;
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
        <Route path="login" element={<SignIn />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
