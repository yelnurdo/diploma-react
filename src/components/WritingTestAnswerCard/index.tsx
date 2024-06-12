import { useState, useEffect, ChangeEvent } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { updateWritingTestAnswer } from '@my-firebase/firestore';
import axios from 'axios';
import ImageViewer from '@components/ImageViewer';
import { IWritingTestAnswer } from '@utils/interfaces';
import styles from './WritingTestAnswerCard.module.scss';
import Button from '@components/Button';
import Input from '@components/Input';

interface Props {
  item: IWritingTestAnswer;
}

const WritingTestAnswerCard: React.FC<Props> = ({ item }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const activeImageUrl = activeIndex === 1 ? item.img1 : activeIndex === 2 ? item.img2 : '';
  const [feedback1, setFeedback1] = useState(item.feedback1 || '');
  const [feedback2, setFeedback2] = useState(item.feedback2 || '');
  const [q1, setQ1] = useState(item.q1);
  const [q2, setQ2] = useState(item.q2);

  const getAIResponse = async (question: string) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: question,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.7,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error getting AI feedback:', error);
      return 'Error in getting feedback';
    }
  };

  useEffect(() => {
    const fetchAIResponse = async () => {
      setIsLoading(true);
      const feedback1 = await getAIResponse(q1);
      const feedback2 = await getAIResponse(q2);
      setFeedback1(feedback1);
      setFeedback2(feedback2);
      setIsLoading(false);

      // Update the feedback in the database
      await updateWritingTestAnswer(item.id, { feedback1, feedback2, q1, q2 });
    };

    fetchAIResponse();
  }, [q1, q2]);
  const handleFeedbackSubmit = async () => {
    setIsLoading(true);
    // Your logic here
    setIsLoading(false);
  };
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {item.img1 && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 1 })}
            onClick={() => setActiveIndex(1)}
          >
            <FontAwesomeIcon icon={faImage} />
          </div>
        )}
        {item.img2 && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 2 })}
            onClick={() => setActiveIndex(2)}
          >
            <FontAwesomeIcon icon={faImage} />
          </div>
        )}
        <div
          className={classNames(styles.button, { [styles.active]: showQuestions })}
          onClick={() => setShowQuestions(!showQuestions)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
      </div>
      <div className={styles.block}>
        <div>
          <p className={styles.title}>Part</p>
          <h4 className={styles.text}>{item.part}</h4>
        </div>
      </div>
      {item.student && (
        <div className={styles.student}>
          <p className={styles.title}>Student</p>
          <h4 className={styles.text}>{item.student}</h4>
        </div>
      )}
      {(activeIndex === 1 || activeIndex === 2) && (
        <div className={styles.content}>
          <p className={styles.title}>Image №{activeIndex}</p>
          <ImageViewer imageUrl={activeImageUrl} />
        </div>
      )}
      {showQuestions && (
        <div className={styles.questionsSection}>
          <div className={styles.grid}>
            <div>
              <h4 className={styles.boldText}>Question 1</h4>
              <textarea value={q1} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQ1(e.target.value)} />
              <Input
                title="Feedback 1"
                placeholder="Enter feedback for question 1"
                value={feedback1}
                setValue={setFeedback1}
                hasBorder={true}
              />
            </div>
            <div>
              <h4 className={styles.boldText}>Question 2</h4>
              <textarea value={q2} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQ2(e.target.value)} />
              <Input
                title="Feedback 2"
                placeholder="Enter feedback for question 2"
                value={feedback2}
                setValue={setFeedback2}
                hasBorder={true}
              />
            </div>
          </div>
          <Button text="Update" onClick={handleFeedbackSubmit} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default WritingTestAnswerCard;
