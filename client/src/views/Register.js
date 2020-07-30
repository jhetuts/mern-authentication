import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../actions/authAction";

const Register = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    props.registerUser(data);
  };
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  });
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input name="name" type="text" ref={register} required />
        <label htmlFor="email">Email</label>
        <input name="email" type="email" ref={register} required />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" ref={register} required />
        <label htmlFor="cpassword">Confirm Password</label>
        <input name="cpassword" type="password" ref={register} required />
        <button>Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
