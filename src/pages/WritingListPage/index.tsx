import { useEffect, useState } from "react";
import { getAllWritingTests } from "@my-firebase/firestore";
import Header from "@components/Header";
import Loader from "@components/Loader";
import { CREATE_WRITING_PAGE_ROUTE } from "@utils/consts";
import { IWritingTest } from "@utils/interfaces";
import styles from "./WritingListPage.module.scss";
import WritingTestCard from "@components/WritingTestCard";

const WritingListPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IWritingTest[]>([]);

  useEffect(() => {
    const fetchWritingTests = async () => {
      try {
        setIsLoading(true);
        const writingTests: IWritingTest[] = await getAllWritingTests();
        setTests(writingTests);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWritingTests();
  }, []);

  return (
    <div className={styles.page}>
      <Header title="Writing Tests" link={CREATE_WRITING_PAGE_ROUTE} />
      <div className={styles.wrapper}>
        {isLoading ? (
          <Loader isLarge={true} />
        ) : (
          <div className={styles.grid}>
            {tests.map((item) => (
              <WritingTestCard item={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingListPage;
