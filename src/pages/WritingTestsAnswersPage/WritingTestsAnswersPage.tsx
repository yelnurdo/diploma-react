import { useState, useEffect } from 'react';
import { getAllWritingTestsAnswers } from '@my-firebase/firestore';
import { IWritingTestAnswer } from '@utils/interfaces';
import Loader from '@components/Loader';
import WritingTestAnswerCard from '@components/WritingTestAnswerCard';
import styles from './WritingTestsAnswersPage.module.scss';

const WritingTestsAnswersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IWritingTestAnswer[]>([]);

  useEffect(() => {
    const fetchWritingTests = async () => {
      try {
        setIsLoading(true);
        const writingTests: IWritingTestAnswer[] = await getAllWritingTestsAnswers();
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
      {isLoading ? (
        <Loader isLarge={true} />
      ) : (
        <div className={styles.grid}>
          {tests.map((item) => (
            <WritingTestAnswerCard item={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WritingTestsAnswersPage;
