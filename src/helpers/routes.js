import { Navigate, useLocation } from "react-router-dom";
export function IsUserRedirect({ user, loggedInPath, children }) {
  if (!user) {
    return children;
  }
  if (user) {
    return <Navigate to={{ pathname: loggedInPath }} />;
  }

  return null;
}

export function ProtectedRoute({ user, children }) {
  const location = useLocation();
  // return user ? children : <Navigate to="/signin" state={{ from: location }} />;

  if (user) {
    return children;
  }

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: "/signin",
          state: { from: location },
        }}
      />
    );
  }

  return null;
}
