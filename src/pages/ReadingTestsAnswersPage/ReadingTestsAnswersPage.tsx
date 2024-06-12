import { useState, useEffect } from 'react';
import { getAllReadingTestsAnswers, updateReadingTestAnswerFeedback } from '@my-firebase/firestore';
import { IReadingTestAnswer } from '@utils/interfaces';
import Loader from '@components/Loader';
import Input from '@components/Input';
import Button from '@components/Button';
import styles from './ReadingTestsAnswersPage.module.scss';

const ReadingTestsAnswersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IReadingTestAnswer[]>([]);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});

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

  const handleFeedbackChange = (id: string, value: string) => {
    setFeedback({ ...feedback, [id]: value });
  };

  const handleFeedbackSubmit = async (id: string) => {
    try {
      await updateReadingTestAnswerFeedback(id, feedback[id]);
      alert('Feedback updated successfully');
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const toggleDetails = (id: string) => {
    setShowDetails({ ...showDetails, [id]: !showDetails[id] });
  };

  return (
    <div className={styles.page}>
      {isLoading ? (
        <Loader isLarge={true} />
      ) : (
        <div className={styles.grid}>
          {tests.map((item) => (
            <div key={item.id} className={styles.card}>
              <Button text={showDetails[item.id] ? "Hide Test" : "Show Test"} onClick={() => toggleDetails(item.id)} />
              {showDetails[item.id] && (
                <div className={styles.content}>
                  <p>Student: {item.student}</p>
                  <p>Part: {item.part}</p>
                  <img src={item.img1} alt="Test Image 1" className={styles.testImage} />
                  {item.img2 && <img src={item.img2} alt="Test Image 2" className={styles.testImage} />}
                  {item.img3 && <img src={item.img3} alt="Test Image 3" className={styles.testImage} />}
                  <p>Answer 1: {item.q1}</p>
                  <p>Answer 2: {item.q2}</p>
                  <p>Answer 3: {item.q3}</p>
                  <p>Answer 4: {item.q4}</p>
                  <p>Answer 5: {item.q5}</p>
                  <Input
                    title="Feedback"
                    placeholder="Enter feedback"
                    value={feedback[item.id] || item.feedback}
                    setValue={(value) => handleFeedbackChange(item.id, value)}
                  />
                  <Button text="Submit Feedback" onClick={() => handleFeedbackSubmit(item.id)} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingTestsAnswersPage;