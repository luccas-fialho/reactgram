import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="register">
      <h2>Reactgram</h2>
      <p>Sign up so you can see your friends posts!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm password" />
        <input type="submit" value="Sign up" />
      </form>
      <p>
        Already has an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
