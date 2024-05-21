import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "./config";
import { IReadingTest } from "@utils/interfaces";

export const getAllReadingTests = async () => {
  const readingRef = collection(firestore, "ReadingTests");
  const querySnapshot = await getDocs(readingRef);

  const readingTests: IReadingTest[] = [];

  querySnapshot.forEach(doc => {
    const item = doc.data() as IReadingTest;
    item.id = doc.id;
    readingTests.push(item);
  });

  return readingTests;
}

export const updateReadingTaskUploadedImage = async (id: string, imageUrl: string, isSecondImage: boolean) => {
  const docRef = doc(firestore, "ReadingTests", id);
  await updateDoc(docRef, isSecondImage ? {
    img2: imageUrl
  } : {
    img3: imageUrl
  });
}

export const updateData = async (collection: string, id: string, data: any) => {
  const docRef = doc(firestore, collection, id);
  await updateDoc(docRef, data);
}

export const deleteData = async (collection: string, id: string) => {
  const docRef = doc(firestore, collection, id);
  await deleteDoc(docRef);
}