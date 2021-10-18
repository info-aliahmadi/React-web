import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { BrowserRouter as Router } from "react-router-dom";

import "../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./components/layout/Loader";
import Aux from "hoc/_Aux";
import ScrollToTop from "./components/layout/ScrollToTop";
import SigninOidc from "components/pages/Auth/signin-oidc";
import SignoutOidc from "components/pages/Auth/signout-oidc";
import Home from "components/pages/Auth/home";
import Login from "components/pages/Auth/login";
import store from "store/store";
import userManager, { loadUserFromStorage } from "services/Auth/userService";
import AuthProvider from "utils/authProvider";
import PrivateRoute from "utils/protectedRoute";
import { Provider } from "react-redux";
import routes from "navigation/privateRoute";
//mport Dashboard from "../Demo/Dashboard/Default";

const AdminLayout = Loadable({
  loader: () => import("./components/layout/AdminLayout"),
  loading: Loader,
});

function App() {
  useEffect(() => {
    // fetch current user from cookies
    loadUserFromStorage(store);
  }, []);

  const privateRoute = routes.map((route, index) => {
    return route.component ? (
      <PrivateRoute
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        component={route.component}
      />
    ) : null;
  });
  return (
    <Provider store={store}>
      <AuthProvider userManager={userManager} store={store}>
        <Router basename="/">
          <Aux>
            <ScrollToTop>
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/signout-oidc" component={SignoutOidc} />
                  <Route path="/signin-oidc" component={SigninOidc} />
                  <PrivateRoute path="/home" component={Home} />
                  <Route path="/" component={AdminLayout} />
                  {privateRoute}
                </Switch>
              </Suspense>
            </ScrollToTop>
          </Aux>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
