import { useEffect, useState } from "react";
import { getAllReadingTests } from "@my-firebase/firestore";
import Loader from "@components/Loader";
import Title from "@components/Title";
import { IReadingTest } from "@utils/interfaces";
import styles from "./ReadingListPage.module.scss";
import ReadingTestCard from "@components/ReadingTestCard";

const ReadingListPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IReadingTest[]>([]);

  useEffect(() => {
    const fetchReadingTests = async () => {
      try {
        setIsLoading(true);
        const readingTests: IReadingTest[] = await getAllReadingTests();
        setTests(readingTests);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadingTests();
  }, []);

  return (
    <div className={styles.page}>
      <Title title="Reading Tests" />
      <div className={styles.layout}>
        {isLoading ? (
          <Loader isFull={true} />
        ) : (
          <div className={styles.grid}>
            {tests.map((item) => (
              <ReadingTestCard item={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingListPage;
