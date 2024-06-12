// src/pages/ListeningTestsAnswersPage/ListeningTestsAnswersPage.tsx
import { useState, useEffect } from 'react';
import { getAllListeningTestsAnswers } from '@my-firebase/firestore'; // Remove unused imports
import { IListeningTestAnswer } from '@utils/interfaces';
import Loader from '@components/Loader';
import ListeningTestAnswerCard from '../../components/ListeningTestAnswerCard/ListeningTestAnswerCard'; // Adjusted import for ListeningTestAnswerCard
import styles from './ListeningTestsAnswersPage.module.scss';

const ListeningTestsAnswersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IListeningTestAnswer[]>([]);

  useEffect(() => {
    const fetchListeningTestsAnswers = async () => {
      try {
        setIsLoading(true);
        const listeningTests: IListeningTestAnswer[] = await getAllListeningTestsAnswers();
        setTests(listeningTests);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListeningTestsAnswers();
  }, []);

  return (
    <div className={styles.page}>
      {isLoading ? (
        <Loader isLarge={true} />
      ) : (
        <div className={styles.grid}>
          {tests.map((item) => (
            <ListeningTestAnswerCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListeningTestsAnswersPage;
