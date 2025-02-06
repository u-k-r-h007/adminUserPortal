import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("user");

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
