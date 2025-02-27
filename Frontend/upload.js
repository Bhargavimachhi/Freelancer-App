import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadFile = async (file, path) => {
  const fileType = file?.type;
  console.log(fileType);

  if (fileType === "application/pdf" || fileType.split("/")[0] === 'image') {
    try {
      const refoffile = ref(storage, path);
      await uploadBytes(refoffile, file).then((snapshot) => {
        console.log(snapshot);
        
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

export const fetchFile = async (path) => {
  const fileRef = ref(storage, path);
  const url = await getDownloadURL(fileRef);
  return url;
};
