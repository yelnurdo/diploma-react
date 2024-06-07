import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "./config";
import { IListeningTest, IReadingTest, IWritingTest } from "@utils/interfaces";
import { LISTENING_TESTS_COLLECTION, READING_TESTS_COLLECTION } from "@utils/consts";

export const getAllReadingTests = async () => {
  const readingRef = collection(firestore, READING_TESTS_COLLECTION);
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
  const docRef = doc(firestore, READING_TESTS_COLLECTION, id);
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

export const addNewReadingTest = async (data: Omit<IReadingTest, "id">) => {
  const collectionRef = collection(firestore, READING_TESTS_COLLECTION);
  const result = await addDoc(collectionRef, data);
  const docRef = doc(firestore, READING_TESTS_COLLECTION, result.id);
  await updateDoc(docRef, { id: result.id });
}

export const getAllListeningTests = async () => {
  const listeningRef = collection(firestore, LISTENING_TESTS_COLLECTION);
  const querySnapshot = await getDocs(listeningRef);

  const listeningTests: IListeningTest[] = [];

  querySnapshot.forEach(doc => {
    const item = doc.data() as IListeningTest;
    item.id = doc.id;
    listeningTests.push(item);
  });

  return listeningTests;
}

export const addNewListeningTest = async (data: Omit<IListeningTest, "id">) => {
  const collectionRef = collection(firestore, LISTENING_TESTS_COLLECTION);
  const result = await addDoc(collectionRef, data);
  const docRef = doc(firestore, LISTENING_TESTS_COLLECTION, result.id);
  await updateDoc(docRef, { id: result.id });
}
const WRITING_TESTS_COLLECTION = "WritingTests";

// Function to get all writing tests
export const getAllWritingTests = async () => {
  const writingRef = collection(firestore, WRITING_TESTS_COLLECTION);
  const querySnapshot = await getDocs(writingRef);

  const writingTests: IWritingTest[] = [];

  querySnapshot.forEach(doc => {
    const item = doc.data() as IWritingTest;
    item.id = doc.id;
    writingTests.push(item);
  });

  return writingTests;
}

// Function to add a new writing test
export const addNewWritingTest = async (data: Omit<IWritingTest, "id">) => {
  const collectionRef = collection(firestore, WRITING_TESTS_COLLECTION);
  const result = await addDoc(collectionRef, data);
  const docRef = doc(firestore, WRITING_TESTS_COLLECTION, result.id);
  await updateDoc(docRef, { id: result.id });
}

// Function to update writing test data
export const updateWritingTest = async (id: string, data: Partial<IWritingTest>) => {
  const docRef = doc(firestore, WRITING_TESTS_COLLECTION, id);
  await updateDoc(docRef, data);
}

// Function to update uploaded image for writing test
export const updateWritingTaskUploadedImage = async (id: string, imageUrl: string, isSecondImage: boolean) => {
  const docRef = doc(firestore, WRITING_TESTS_COLLECTION, id);
  await updateDoc(docRef, isSecondImage ? { img2: imageUrl } : { img1: imageUrl });
}

// Function to delete a writing test
export const deleteWritingTest = async (id: string) => {
  const docRef = doc(firestore, WRITING_TESTS_COLLECTION, id);
  await deleteDoc(docRef);
}