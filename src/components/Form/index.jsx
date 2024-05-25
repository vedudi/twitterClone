import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { auth, db } from "../../fireBase/config";
import React, { useState } from "react";
import Loader from "../Loader";
import upload from "../../utils/upLoad";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const tweetsCol = collection(db, "tweets");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    const file = e.target[1].files[0];
    if (!text && !file) {
      return toast.warning("you can not send empty", {
        position: "bottom-right",
      });
    }

    setIsLoading(true);
    const url = await upload(file);

    try {
      await addDoc(tweetsCol, {
        textContent: text,
        imagineContent: url,
        likes: [],
        isEdited: false,
        createdAt: serverTimestamp(),
        user: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          photo: auth.currentUser.photoURL,
        },
      });
    } catch (err) {
      toast.error("there is a problem when you send tweet");
    }
    setIsLoading(false);
    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img className="rounded-full h-[35px] md:h-[45px]" src={user?.photoURL} />
      <div className="w-full">
        <input
          className="w-full mt-1 mb-2 bg-transparent outline-none md:text-lg"
          placeholder="whats happening"
          type="text"
        />
        <div className="flex justify-between items-center">
          <label
            htmlFor="image"
            className=" rounded-full hover:bg-gray-800 text-2xl transition p-4  cursor-pointer"
          >
            <BsCardImage />
          </label>
          <input className="hidden" type="file" id="image" />
          <button className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
            {isLoading ? <Loader /> : "Send Twit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(Form);
