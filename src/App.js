import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserInfo from "./pages/UserInfo";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullProduct from "./components/FullProduct";
import Likes from "./pages/Likes";

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
        <Route path="likes" element={<Likes />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/product/:id" element={<FullProduct />} />
      </Routes>
    </div>
  );
}

export default App;
