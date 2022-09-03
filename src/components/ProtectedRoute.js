import { Redirect  } from "react-router-dom";

function ProtectedRoute({ isLoggiedIn, children }) {
  if (!isLoggiedIn) {
    return <Redirect  to="/sign-in" />;
  }

  return children;
}

export default ProtectedRoute;