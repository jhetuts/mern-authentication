import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser, setRegistered } from "../actions/authAction";

import ErrorText from "../components/common/ErrorText";

const Login = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    props.loginUser(data);
  };
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }

    props.setRegistered({});
  });
  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          className={props.errors.email && "input-error"}
          name="email"
          type="email"
          ref={register}
          required
        />
        {props.errors.email && <ErrorText message={props.errors.email} />}
        <label htmlFor="password">Password</label>
        <input
          className={props.errors.password && "input-error"}
          name="password"
          type="password"
          ref={register}
          required
        />
        {props.errors.password && <ErrorText message={props.errors.password} />}
        <button>Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser, setRegistered })(
  withRouter(Login)
);
