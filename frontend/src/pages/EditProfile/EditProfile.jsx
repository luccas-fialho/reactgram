import "./EditProfile.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { profile, resetMessage } from "../../slices/userSlice";

import Message from "../../components/Message/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { loading, error, user, message } = useSelector((state) => state.user);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="edit-profile">
      <h2>Edit your profile!</h2>
      <p className="subtitle">
        Add a profile picture and tell more about you...
      </p>
      {/* Image preview */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" placeholder="E-mail" disabled value={email || ""} />
        <label>
          <span>Profile image:</span>
          <input type="file" />
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
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default EditProfile;
