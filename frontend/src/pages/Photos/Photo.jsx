import "./Photo.css";

import { uploads } from "../../utils/config";

import Message from "../../components/Message/Message";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhoto } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem.jsx";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
    </div>
  );
};

export default Photo;
