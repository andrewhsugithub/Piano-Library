import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Browse, Signin, Signup, Main, Synthesia } from "./pages";
import * as ROUTES from "./constants/routes";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { useAuthListener } from "./hooks";

export default function App() {
  const user = useAuthListener().user;
  // const user = null;

  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={
            <IsUserRedirect
              user={user}
              loggedInPath={ROUTES.BROWSE}
              path={ROUTES.SIGN_IN}
            >
              <Signin />
            </IsUserRedirect>
          }
        />
        <Route
          path="/signup"
          element={
            <IsUserRedirect
              user={user}
              loggedInPath={ROUTES.BROWSE}
              path={ROUTES.SIGN_UP}
            >
              <Signup />
            </IsUserRedirect>
          }
        />
        <Route
          path={ROUTES.BROWSE}
          element={
            <ProtectedRoute user={user} path={ROUTES.BROWSE}>
              <Browse />
            </ProtectedRoute>
          }
        />
        {/* <ProtectedRoute user={user} path={ROUTES.BROWSE}>
          <Browse />
        </ProtectedRoute> */}
        <Route
          path={ROUTES.HOME}
          element={
            <IsUserRedirect
              user={user}
              loggedInPath={ROUTES.BROWSE}
              path={ROUTES.HOME}
            >
              <Home />
            </IsUserRedirect>
          }
        />
        <Route
          path={ROUTES.MAIN}
          element={
            <ProtectedRoute user={user} path={ROUTES.MAIN}>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
