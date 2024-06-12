import { useState, useEffect } from 'react';
import { getAllWritingTestsAnswers, updateWritingTestAnswerFeedback } from '@my-firebase/firestore';
import { IWritingTestAnswer } from '@utils/interfaces';
import Loader from '@components/Loader';
import Input from '@components/Input';
import Button from '@components/Button';
import ImageViewer from '@components/ImageViewer';
import styles from './WritingTestsAnswersPage.module.scss';

const WritingTestsAnswersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IWritingTestAnswer[]>([]);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchWritingTestsAnswers = async () => {
      try {
        setIsLoading(true);
        const writingTests: IWritingTestAnswer[] = await getAllWritingTestsAnswers();
        setTests(writingTests);
        const initialFeedback = writingTests.reduce((acc, test) => {
          acc[test.id] = test.feedback || '';
          return acc;
        }, {} as { [key: string]: string });
        setFeedback(initialFeedback);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWritingTestsAnswers();
  }, []);

  const handleFeedbackChange = (id: string, value: string) => {
    setFeedback({ ...feedback, [id]: value });
  };

  const handleFeedbackSubmit = async (docId: string) => {
    try {
      const doc = tests.find(test => test.id === docId);
      if (!doc) {
        throw new Error('Document not found');
      }
      await updateWritingTestAnswerFeedback(doc.id, feedback[doc.id]);
      alert('Feedback updated successfully');
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Error updating feedback:', error);
      alert(`Error updating feedback: ${errorMessage}`);
    }
  };

  return (
    <div className={styles.page}>
      {isLoading ? (
        <Loader isLarge={true} />
      ) : (
        <div className={styles.grid}>
          {tests.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.content}>
                <p>Student: {item.student}</p>
                <p>Part: {item.part}</p>
                <div className={styles.images}>
                  <ImageViewer imageUrl={item.img1} />
                  {item.img2 && <ImageViewer imageUrl={item.img2} />}
                </div>
                <div className={styles.answers}>
                  <div>
                    <h4>Question 1</h4>
                    <p>{item.q1}</p>
                    <p>{item.wordCount1}</p>
                  </div>
                  <div>
                    <h4>Question 2</h4>
                    <p>{item.q2}</p>
                    <p>{item.wordCount2}</p>
                  </div>
                </div>
                <Input
                  title="Feedback"
                  placeholder="Enter feedback"
                  value={feedback[item.id] || ''}
                  setValue={(value) => handleFeedbackChange(item.id, value)}
                />
                <Button text="Submit Feedback" onClick={() => handleFeedbackSubmit(item.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WritingTestsAnswersPage;
