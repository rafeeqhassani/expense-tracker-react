import { Navigate } from "react-router-dom";
import useAppContext from "../providers/useAppContext";

function ProtectedRoute({ children }) {
  const { auth } = useAppContext();

  if (auth.initializing) {
    return <p>Loading...</p>;
  }

  if (!auth.token) {
    console.log("Redirecting to login");

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
