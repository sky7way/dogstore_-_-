import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
