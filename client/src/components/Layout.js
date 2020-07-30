import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import Landing from "../views/Landing";

const Layout = () => {
  return (
    <Router>
      <header>
        <h1>Auth App</h1>
        <nav>
          <ul className="links">
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </main>
      <footer>Footer</footer>
    </Router>
  );
};

export default Layout;
