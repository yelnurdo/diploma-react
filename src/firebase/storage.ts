// firebaseStorage.ts
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./config";

export const uploadImage = (collection: string,file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${collection}/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        }).catch(reject);
      }
    );
  });
};
