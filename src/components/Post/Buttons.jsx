import { LuMessageCircle } from "react-icons/lu";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../fireBase/config";

const Buttons = ({ tweet }) => {
  const isLiked = tweet.likes.includes(auth.currentUser.uid);
  const toggleLike = () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    updateDoc(tweetRef, {
      likes: isLiked ? arrayRemove(auth.currentUser.uid) : arrayUnion(auth.currentUser.uid),
    });
  };
  return (
    <div className="flex justify-between items-center">
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#00a6ff43]">
        <LuMessageCircle />
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#00ff5956]">
        <FaRetweet />
      </div>
      <div
        onClick={toggleLike}
        className="flex items-center gap-2 p-3 rounded-full cursor-pointer transition hover:bg-[#ff000074]"
      > {isLiked?<FaHeart className="text-red-400"/>:<FaRegHeart />}
        
        {tweet.likes.length}
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#5abdf380]">
        <CiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
