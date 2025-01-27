import React, { useEffect, useState } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, reset } from "../../slices/authSlice";
import Message from "../../components/Message/Message";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(login(data));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Log in to see users posts!</p>
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {!loading && <input type="submit" value="Log in" />}
        {loading && <input type="submit" value="Loading..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
