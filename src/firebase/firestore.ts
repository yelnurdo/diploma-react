import { collection, getDocs } from "firebase/firestore";
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