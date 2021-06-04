import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Login from "./screens/authenticationScreens/Login";
import SignUp from "./screens/authenticationScreens/SignUp";
import ResetPassword from "./screens/authenticationScreens/ResetPassword";
import ResetPasswordConfirm from "./screens/authenticationScreens/ResetPasswordConfirm";
import ActivateAccount from "./screens/authenticationScreens/ActivateAccount";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/login"} component={Login} />
        <Route path={"/signup"} component={SignUp} />
        <Route path={"/reset-password"} component={ResetPassword} />
        <Route
          path={"/password/reset/confirm/:uid/:token"}
          component={ResetPasswordConfirm}
        />
        <Route path={"/activate/:uid/:token"} component={ActivateAccount} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
