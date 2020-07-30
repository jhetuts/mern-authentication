import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../actions/authAction";

const Login = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    props.loginUser(data);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" ref={register} required />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" ref={register} required />
        <button>Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(withRouter(Login));
