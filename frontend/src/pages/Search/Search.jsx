import "./Search.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery.jsx";

import LikeContainer from "../../components/LikeContainer/LikeContainer.jsx";
import PhotoItem from "../../components/PhotoItem/PhotoItem.jsx";
import { Link } from "react-router-dom";

import { searchPhotos, like } from "../../slices/photoSlice.js";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage();

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) return <p>Loading...</p>;
  console.log(photos);

  return (
    <div id="search">
      <h2>You are searching for: {search}</h2>
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
        <h2 className="no-photos">There's no results for your search...</h2>
      )}
    </div>
  );
};

export default Search;
