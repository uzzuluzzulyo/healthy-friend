import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../lib/auth.js';

function RequireAuth({ children }) {
  if (!import.meta.env.DEV && !isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireAuth;
