import "./Profile.css";

import { uploads } from "../../utils/config";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";

import { getUserDetails } from "../../slices/userSlice";
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  resetMessage,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const newPhotoForm = useRef();
  const editPhotoFOrm = useRef();

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  // Photo
  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) => {
      formData.append(key, photoData[key]);
    });

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetComponentMessage();
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    image ? setImage(image) : console.log("error");
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    resetComponentMessage();
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
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Share a moment of yours:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Photo title:</span>
                <input
                  type="text"
                  placeholder="Type a title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Image:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loading && <input type="submit" value="Submit" />}
              {loading && <input type="submit" value="Loading..." disabled />}
            </form>
            {errorPhoto && <Message msg={errorPhoto} type="error" />}
            {messagePhoto && <Message msg={messagePhoto} type="success" />}
          </div>
        </>
      )}
      <div className="user-photos">
        <h2>Your photos:</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>There's no photos yet...</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
