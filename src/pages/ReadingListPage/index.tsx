import { useEffect, useState } from "react";
import { getAllReadingTests } from "@my-firebase/firestore";
import Loader from "@components/Loader";
import Header from "@components/Header";
import ReadingTestCard from "@components/ReadingTestCard";
import { IReadingTest } from "@utils/interfaces";
import { CREATE_READING_PAGE_ROUTE } from "@utils/consts";
import styles from "./ReadingListPage.module.scss";

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
      <Header title="Reading Tests" link={CREATE_READING_PAGE_ROUTE} />
      <div className={styles.wrapper}>
        {isLoading ? (
          <Loader isLarge={true} />
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
