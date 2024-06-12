import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "./config";
import { IListeningTest, IReadingTest, IWritingTest, IListeningTestAnswer, IReadingTestAnswer, IWritingTestAnswer } from "@utils/interfaces";
import { LISTENING_TESTS_COLLECTION, READING_TESTS_COLLECTION, WRITING_TESTS_COLLECTION } from "@utils/consts";

export const getAllReadingTests = async (): Promise<IReadingTest[]> => {
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

export const getAllListeningTests = async (): Promise<IListeningTest[]> => {
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

export const getAllWritingTests = async (): Promise<IWritingTest[]> => {
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

// Functions to add new tests
export const addNewReadingTest = async (data: Omit<IReadingTest, "id">) => {
  const collectionRef = collection(firestore, READING_TESTS_COLLECTION);
  const result = await addDoc(collectionRef, data);
  const docRef = doc(firestore, READING_TESTS_COLLECTION, result.id);
  await updateDoc(docRef, { id: result.id });
}

export const addNewListeningTest = async (data: Omit<IListeningTest, "id">) => {
  const collectionRef = collection(firestore, LISTENING_TESTS_COLLECTION);
  const result = await addDoc(collectionRef, data);
  const docRef = doc(firestore, LISTENING_TESTS_COLLECTION, result.id);
  await updateDoc(docRef, { id: result.id });
}

export const addNewWritingTest = async (data: Omit<IWritingTest, "id">) => {
  const collectionRef = collection(firestore, WRITING_TESTS_COLLECTION);
  const result = await addDoc(collectionRef, data);
  const docRef = doc(firestore, WRITING_TESTS_COLLECTION, result.id);
  await updateDoc(docRef, { id: result.id });
}

// Functions to update test data
export const updateReadingTaskUploadedImage = async (id: string, imageUrl: string, isSecondImage: boolean) => {
  const docRef = doc(firestore, READING_TESTS_COLLECTION, id);
  await updateDoc(docRef, isSecondImage ? { img2: imageUrl } : { img3: imageUrl });
}

export const updateWritingTaskUploadedImage = async (id: string, imageUrl: string, isSecondImage: boolean) => {
  const docRef = doc(firestore, WRITING_TESTS_COLLECTION, id);
  await updateDoc(docRef, isSecondImage ? { img2: imageUrl } : { img1: imageUrl });
}

export const updateWritingTest = async (id: string, data: Partial<IWritingTest>) => {
  const docRef = doc(firestore, WRITING_TESTS_COLLECTION, id);
  await updateDoc(docRef, data);
}

export const updateData = async (collection: string, id: string, data: Partial<IListeningTest | IReadingTest | IWritingTest>) => {
  const docRef = doc(firestore, collection, id);
  await updateDoc(docRef, data);
}

// Functions to delete tests
export const deleteData = async (collection: string, id: string) => {
  const docRef = doc(firestore, collection, id);
  await deleteDoc(docRef);
}

export const deleteWritingTest = async (id: string) => {
  const docRef = doc(firestore, WRITING_TESTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// Functions to get all answers
export const getAllListeningTestsAnswers = async (): Promise<IListeningTestAnswer[]> => {
  const listeningRef = collection(firestore, 'ListeningTestsAnswers');
  const querySnapshot = await getDocs(listeningRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IListeningTestAnswer));
};

export const getAllReadingTestsAnswers = async (): Promise<IReadingTestAnswer[]> => {
  const readingRef = collection(firestore, 'ReadingTestsAnswers');
  const querySnapshot = await getDocs(readingRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IReadingTestAnswer));
};

export const getAllWritingTestsAnswers = async (): Promise<IWritingTestAnswer[]> => {
  const writingRef = collection(firestore, 'WritingTestsAnswers');
  const querySnapshot = await getDocs(writingRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IWritingTestAnswer));
};

// Functions to update feedback
export const updateListeningTestAnswerFeedback = async (id: string, feedback: string) => {
  const docRef = doc(firestore, 'ListeningTestsAnswers', id);
  await updateDoc(docRef, { feedback });
};

export const updateReadingTestAnswerFeedback = async (id: string, feedback: string) => {
  const docRef = doc(firestore, 'ReadingTestsAnswers', id);
  await updateDoc(docRef, { feedback });
};

export const updateWritingTestAnswerFeedback = async (id: string, feedback: string) => {
  const docRef = doc(firestore, 'WritingTestsAnswers', id);
  await updateDoc(docRef, { feedback });
};

export const updateListeningTestAnswer = async (id: string, data: Partial<IListeningTestAnswer>) => {
  const docRef = doc(firestore, 'ListeningTestsAnswers', id);
  await updateDoc(docRef, data);
};

export const updateReadingTestAnswer = async (id: string, data: Partial<IReadingTestAnswer>) => {
  const docRef = doc(firestore, 'ReadingTestsAnswers', id);
  await updateDoc(docRef, data);
};

export const updateWritingTestAnswer = async (id: string, data: Partial<IWritingTestAnswer>) => {
  const docRef = doc(firestore, 'WritingTestsAnswers', id);
  await updateDoc(docRef, data);
};