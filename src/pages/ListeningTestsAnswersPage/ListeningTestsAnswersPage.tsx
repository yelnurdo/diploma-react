import { useState, useEffect } from 'react';
import { getAllListeningTestsAnswers, updateListeningTestAnswerFeedback } from '@my-firebase/firestore';
import { IListeningTestAnswer } from '@utils/interfaces';
import Loader from '@components/Loader';
import Input from '@components/Input';
import Button from '@components/Button';
import styles from './ListeningTestsAnswersPage.module.scss';

const ListeningTestsAnswersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IListeningTestAnswer[]>([]);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});

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

  const handleFeedbackChange = (id: string, value: string) => {
    setFeedback({ ...feedback, [id]: value });
  };

  const handleFeedbackSubmit = async (id: string) => {
    try {
      await updateListeningTestAnswerFeedback(id, feedback[id]);
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
                  {item.img4 && <img src={item.img4} alt="Test Image 4" className={styles.testImage} />}
                  <audio controls src={item.audio1} className={styles.audio}></audio>
                  {item.audio2 && <audio controls src={item.audio2} className={styles.audio}></audio>}
                  {item.audio3 && <audio controls src={item.audio3} className={styles.audio}></audio>}
                  {item.audio4 && <audio controls src={item.audio4} className={styles.audio}></audio>}
                  {[...Array(40)].map((_, i) => (
                    <p key={i}>Answer {i + 1}: {item[`q${i + 1}`]}</p>
                  ))}
                  <Input
                    title="Feedback"
                    placeholder="Enter feedback"
                    value={feedback[item.id] || item.feedback}
                    setValue={(value) => handleFeedbackChange(item.id, value)}
                    hasBorder={true}
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

export default ListeningTestsAnswersPage;
