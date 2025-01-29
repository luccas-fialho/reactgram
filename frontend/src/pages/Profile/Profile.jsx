import "./Profile.css";

import { uploads } from "../../utils/config";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";

import { getUserDetails } from "../../slices/userSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  const newPhotoForm = useRef();
  const editPhotoFOrm = useRef();

  // Photo
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <div className="new-photo" ref={newPhotoForm}>
          <h3>Share a moment of yours:</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Photo title:</span>
              <input type="text" placeholder="Type a title" />
            </label>
            <label>
              <span>Image:</span>
              <input type="file" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
