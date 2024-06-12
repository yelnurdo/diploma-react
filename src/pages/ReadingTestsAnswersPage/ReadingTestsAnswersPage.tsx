// src/pages/ReadingTestsAnswersPage/ReadingTestsAnswersPage.tsx
import { useState, useEffect } from 'react';
import { getAllReadingTestsAnswers } from '@my-firebase/firestore';
import { IReadingTestAnswer } from '@utils/interfaces';
import Loader from '@components/Loader';
import ReadingTestAnswerCard from '@components/ReadingTestAnswerCard';
import styles from './ReadingTestsAnswersPage.module.scss';

const ReadingTestsAnswersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IReadingTestAnswer[]>([]);

  useEffect(() => {
    const fetchReadingTestsAnswers = async () => {
      try {
        setIsLoading(true);
        const readingTests: IReadingTestAnswer[] = await getAllReadingTestsAnswers();
        setTests(readingTests);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadingTestsAnswers();
  }, []);

  return (
    <div className={styles.page}>
      {isLoading ? (
        <Loader isLarge={true} />
      ) : (
        <div className={styles.grid}>
          {tests.map((item) => (
            <ReadingTestAnswerCard item={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingTestsAnswersPage;
