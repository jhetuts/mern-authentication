import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/register">register</Link>
    </div>
  );
};
export default Landing;
