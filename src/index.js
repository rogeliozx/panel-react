import React from "react";
import ReactDOM from "react-dom";
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fortawesome/fontawesome-pro/css/all.min.css";
// plugins styles downloaded
import "assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "assets/vendor/select2/dist/css/select2.min.css";
import "assets/vendor/quill/dist/quill.core.css";
import "assets/vendor/nucleo/css/nucleo.css";
// import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss?v1.0.0";


import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
// import IndexView from "views/Index.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      {/* <Route path="/" render={props => <IndexView {...props} />} /> */}
      <Redirect from="*" to="/admin/alternative-dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
