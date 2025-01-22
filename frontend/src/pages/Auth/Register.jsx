import React, { useEffect, useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { register, reset } from "../../slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";

const Register = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(newUser);

    dispatch(register(newUser));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>Reactgram</h2>
      <p>Sign up so you can see your friends posts!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
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
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
        />
        {!loading && <input type="submit" value="Sign up" />}
        {loading && <input type="submit" value="Loading..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Already has an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
