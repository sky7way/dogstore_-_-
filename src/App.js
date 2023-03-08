import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserInfo from "./pages/UserInfo";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
