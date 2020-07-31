import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Login from "../views/Login";
import Register from "../views/Register";
import Navbar from "./Navbar";
import Dashboard from "../views/Dashboard";
import PrivateRoute from "./common/PrivateRoute";

const Layout = () => {
  return (
    <Router>
      <header>
        <h1>Auth App</h1>
        <Navbar />
      </header>
      <main>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </main>
      <footer>&copy; 2020</footer>
    </Router>
  );
};

export default Layout;
