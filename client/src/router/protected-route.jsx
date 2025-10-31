import Loader from "@/components/common/loader";
import { useAuth } from "@/contexts/auth-context";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader items="user data" />;
  }

  if (user) return <>{children}</>;
  return <Navigate to="/sign-in" state={{ from: location }} replace />;
}
