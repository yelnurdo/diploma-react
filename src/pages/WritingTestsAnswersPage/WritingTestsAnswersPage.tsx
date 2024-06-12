import { useState, useEffect } from 'react';
import { getAllWritingTestsAnswers, updateWritingTestAnswerFeedback } from '@my-firebase/firestore';
import { IWritingTestAnswer } from '@utils/interfaces';
import Loader from '@components/Loader';
import Input from '@components/Input';
import Button from '@components/Button';
import ImageViewer from '@components/ImageViewer';
import Tesseract from 'tesseract.js';
import { OpenAI } from 'openai';
import styles from './WritingTestsAnswersPage.module.scss';

// Initialize OpenAI with `dangerouslyAllowBrowser`
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const WritingTestsAnswersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<IWritingTestAnswer[]>([]);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
  const [grades, setGrades] = useState<{ [key: string]: string }>({});
  const [ocrResults, setOcrResults] = useState<{ [key: string]: string }>({});

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

  const evaluateAnswer = async (question: string, answer: string) => {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an IELTS writing examiner.' },
          { role: 'user', content: `Evaluate the following IELTS writing task answer and provide a grade out of 9 (including 0.5 increments) with brief feedback:\n\nQuestion: ${question}\n\nAnswer: ${answer}` }
        ],
        max_tokens: 150,
      });

      const message = response.choices[0]?.message?.content?.trim();
      return message ? message : 'N/A';
    } catch (error) {
      console.error('Error evaluating answer:', error);
      return 'N/A';
    }
  };

  const analyzeImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl, {
        mode: 'cors'
      });
      const blob = await response.blob();
      const result = await Tesseract.recognize(blob, 'eng');
      return result.data.text;
    } catch (error) {
      console.error('Error analyzing image:', error);
      return '';
    }
  };

  const handleEvaluateTest = async (item: IWritingTestAnswer) => {
    setIsLoading(true);
    try {
      const img1Text = await analyzeImage(item.img1);
      const img2Text = item.img2 ? await analyzeImage(item.img2) : '';

      const evaluationQ1 = await evaluateAnswer(img1Text, item.q1);
      const evaluationQ2 = await evaluateAnswer(img2Text, item.q2);

      setGrades({ ...grades, [item.id]: `Q1: ${evaluationQ1}\nQ2: ${evaluationQ2}` });
      setOcrResults({ ...ocrResults, [item.id]: `Q1: ${img1Text}\nQ2: ${img2Text}` });
    } catch (error) {
      console.error('Error evaluating test:', error);
    } finally {
      setIsLoading(false);
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
                <Button
                  text="Evaluate Test"
                  onClick={() => handleEvaluateTest(item)}
                />
                {ocrResults[item.id] && (
                  <div className={styles.ocrResults}>
                    <h4>OCR Results</h4>
                    <p>{ocrResults[item.id]}</p>
                  </div>
                )}
                {grades[item.id] && (
                  <div className={styles.grades}>
                    <h4>Grades</h4>
                    <p>{grades[item.id]}</p>
                  </div>
                )}
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
