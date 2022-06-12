import { Navigate, useLocation, Outlet } from "react-router";
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
  // return user ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/signin" state={{ from: location }} />
  // );

  if (user) {
    // console.log("inside");
    // return <Outlet />;
    return children;
  }

  if (!user) {
    // console.log("bye bye");
    return (
      <Navigate
        to={{
          pathname: "/signin",
          state: { from: location },
        }}
      />
    );
  }

  // return null;
}
