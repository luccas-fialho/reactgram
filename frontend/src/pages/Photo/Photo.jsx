import "./Photo.css";

import { uploads } from "../../utils/config.js";

import Message from "../../components/Message/Message.jsx";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhoto, like } from "../../slices/photoSlice.js";
import PhotoItem from "../../components/PhotoItem/PhotoItem.jsx";
import LikeContainer from "../../components/LikeContainer/LikeContainer.jsx";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("deu like! useeffect");
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = () => {
    console.log("deu like!");
    dispatch(like(photo._id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
    </div>
  );
};

export default Photo;
