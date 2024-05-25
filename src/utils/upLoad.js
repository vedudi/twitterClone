import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { storage } from "../fireBase/config";

const upload = async (file) => {
  if (!file?.type.startsWith("image") || !file) return null;
  const imageRef = ref(storage, v4() + file.name);
  try {
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  } catch (err) {
    toast.error("image can not loaded");
  }
};
export default upload;
