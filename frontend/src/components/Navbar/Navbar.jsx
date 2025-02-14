import React from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout, reset } from "../../slices/authSlice";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav id="nav">
      <Link to="/">Reactgram</Link>
      <form id="search-form" onSubmit={handleSubmit}>
        <BsSearch />
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Log out</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Sign in</NavLink>
            </li>
            <li>
              <NavLink to="/register">Sign up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
