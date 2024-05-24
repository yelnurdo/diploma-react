import { useEffect, useState } from "react";
import { getAllListeningTests } from "@my-firebase/firestore";
import Header from "@components/Header";
import Loader from "@components/Loader";
import { CREATE_LISTENING_PAGE_ROUTE } from "@utils/consts";
import { IListeningTest } from "@utils/interfaces";
import styles from "./ListeningListPage.module.scss";
import ListeningTestCard from "@components/ListeningTestCard";

const ListeningListPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IListeningTest[]>([]);

  useEffect(() => {
    const fetchListeningTests = async () => {
      try {
        setIsLoading(true);
        const listeningTests: IListeningTest[] = await getAllListeningTests();
        setTests(listeningTests);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListeningTests();
  }, []);

  return (
    <div className={styles.page}>
      <Header title="Listening Tests" link={CREATE_LISTENING_PAGE_ROUTE} />
      <div className={styles.wrapper}>
        {isLoading ? (
          <Loader isLarge={true} />
        ) : (
          <div className={styles.grid}>
            {tests.map((item) => (
              <ListeningTestCard item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeningListPage;
