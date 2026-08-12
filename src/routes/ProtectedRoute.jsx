import { Navigate } from "react-router-dom";
import useAppContext from "../providers/useAppContext";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";

function ProtectedRoute({ children }) {
  const { auth } = useAppContext();

  if (auth.initializing || auth.loading) {
    return <LoadingState message="Checking authentication..." />;
  }

  if (auth.error) {
    return <ErrorState message={auth.error} onRetry={auth.loadCurrentUser} />;
  }

  if(!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
