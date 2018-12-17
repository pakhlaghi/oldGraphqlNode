import React from "react";
import { connect } from "react-redux";
import Loadable from "react-loadable";
// components
import Layout from "../features/layout/layout";
import Loading from "../features/loading";
import HomeContainer from "./homeContainer";
// route
import { withRouter } from "react-router-dom";
import CCRoutes from "../utility/ccRoutes";

// lazy loading Dashboard component
const lazyDashboardContainer = Loadable({
  loader: () => import("./dashboardContainer"),
  loading: Loading
});

// lazy loading Dashboard componentF
const lazyLoginContainer = Loadable({
  loader: () => import("./loginContainer"),
  loading: Loading
});

function App({ auth, pathname }) {
  // routes array to create router
  const routes = [
    {
      path: "/home",
      exact: true,
      component: HomeContainer,
      extra: {
        isFullHeader: true
      }
    },
    {
      path: "/Login",
      exact: true,
      component: lazyLoginContainer
    },
    {
      path: "/private",
      component: lazyDashboardContainer,
      auth: {
        isAllowed: auth.isAuthenticated,
        redirectTo: "/login", // if private redirect to ...
        isPrivate: true // is private route?
      }
    },
    {
      path: "/dashboard",
      component: lazyDashboardContainer
    }
  ];

  return (
    <Layout pathname={pathname}>
      <CCRoutes routes={routes} />
    </Layout>
  );
}

// redux map state
const mapStateToProps = (state, props) => {
  return {
    auth: state.app.auth,
    pathname: props.location.pathname
  };
};

export default withRouter(connect(mapStateToProps)(App));