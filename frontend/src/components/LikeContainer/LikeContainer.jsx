import "./LikeContainer.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <FaHeart />
          ) : (
            <FaRegHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
