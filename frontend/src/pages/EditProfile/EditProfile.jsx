import "./EditProfile.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

import Message from "../../components/Message/Message";
import { uploads } from "../../utils/config";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { loading, error, user, message } = useSelector((state) => state.user);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (profileImage) userData.profileImage = profileImage;
    if (bio) userData.bio = bio;
    if (password) userData.password = password;

    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImagePreview(image);
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edit your profile!</h2>
      <p className="subtitle">
        Add a profile picture and tell more about you...
      </p>
      {(user.profileImage || imagePreview) && (
        <img
          className="profile-image"
          src={
            imagePreview ? URL.createObjectURL(imagePreview) : user.profileImage
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
          required
        />
        <input type="email" placeholder="E-mail" disabled value={email || ""} />
        <label>
          <span>Profile image:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Profile description"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Wanna change your password?</span>
          <input
            type="password"
            placeholder="Type your new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value="Save changes" />}
        {loading && <input type="submit" value="Loading..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
