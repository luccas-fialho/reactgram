import "./Photo.css";

import { uploads } from "../../utils/config";

import Message from "../../components/Message/Message";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhoto } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem.jsx";
import LikeContainer from "../../components/LikeContainer/LikeContainer.jsx";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const { user } = useSelector((state) => state.user);

  const handleLike = () => {};

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
    </div>
  );
};

export default Photo;
