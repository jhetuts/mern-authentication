import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../actions/authAction";
import ErrorText from "../components/common/ErrorText";

import isEmpty from "../validations/isEmpty";

const Register = (props) => {
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setMessage("Checking");
    props.registerUser(data, props.history);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (props.registration.registration) {
      setMessage("Successfully registered!");
      setTimeout(() => {
        props.history.push("/login");
      }, 1000);
    }
  });
  return props.registration.registration ? (
    <p className="successful">{message}</p>
  ) : (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          className={props.errors.name && "input-error"}
          name="name"
          type="text"
          ref={register}
          required
        />
        {props.errors.name && <ErrorText message={props.errors.name} />}
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
        <label htmlFor="cpassword">Confirm Password</label>
        <input
          className={props.errors.cpassword && "input-error"}
          name="cpassword"
          type="password"
          ref={register}
          required
        />
        {props.errors.cpassword && (
          <ErrorText message={props.errors.cpassword} />
        )}
        <button>Submit</button>
      </form>
      {message}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  registration: state.registration,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
