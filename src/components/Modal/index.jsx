import { doc, updateDoc } from "firebase/firestore";
import { IoMdClose } from "react-icons/io";
import { db } from "../../fireBase/config";
import { toast } from "react-toastify";
import upload from "../../utils/upLoad";

const Modal = ({ tweet, close }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.title.value;
    const file = e.target.file.files[0];
    const tweetRef = doc(db, "tweets", tweet.id);
    try {
      if (!file && !file?.type.startswith("image")) {
        await updateDoc(tweetRef, {
          textContent: text,
          isEdited:true
        });
      } else {
        const newUrl = await upload(file);
        await updateDoc(tweetRef, {
          textContent: text,
          imageContent: newUrl,
          isEdited:true

        });
      }

      toast.success("tweet updated");
    } catch (err) {
      toast.error("update failed");
    }
    close();
  };
  return (
    <div className="fixed inset-0 w-full h-full grid place-items-center bg-gray-500 bg-opacity-50">
      <div className="flex flex-col bg-black rounded-md p-10 w-3/4 min-h-[60vh] max-h-[80vh]">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold"> edit you tweet</h1>
          <button>
            <IoMdClose
              onClick={close}
              className="text-3xl transition hover:text-gray-500"
            />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" flex-1 mt-10 flex flex-col justify-between"
        >
          <div className="flex flex-col">
            <label className="mb-5"> change the text</label>
            <input
              name="title"
              defaultValue={tweet.textContent}
              className="text-black border rounded-md p-1"
              type="text"
            />
            <label className="mt-10 mb-5"> change / add an image</label>
            <input name="file" type="file" />
          </div>
          <div className="flex justify-end gap-5">
            <button
              onClick={close}
              type="button"
              className="bg-gray-500 py-2 px-5 rounded-full "
            >
              cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 py-2 px-5 rounded-full "
            >
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
