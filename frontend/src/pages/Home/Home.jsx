import "./Home.css";

// components
import LikeContainer from "../../components/LikeContainer/LikeContainer.jsx";
import PhotoItem from "../../components/PhotoItem/PhotoItem.jsx";
import { Link } from "react-router-dom";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage.jsx";

import { getPhotos, like } from "../../slices/photoSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div id="home">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              See more...
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          There's no posted photos yet...
          <Link to={`/users/${user._id}`}> Click here</Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
