// src/components/ReadingTestAnswerCard/index.tsx

import { FormEvent, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faImage, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Button from "@components/Button";
import ImageViewer from "@components/ImageViewer";
import Loader from "@components/Loader";
import { deleteData, updateReadingTestAnswer } from "@my-firebase/firestore";
import { IReadingTestAnswer } from "@utils/interfaces";
import { READING_TESTS_COLLECTION } from "@utils/consts";
import styles from "./ReadingTestAnswerCard.module.scss";

interface Props {
  item: IReadingTestAnswer;
}

const ReadingTestAnswerCard: React.FC<Props> = ({ item }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [feedback, setFeedback] = useState<string>(item.feedback || '');
  const [answers, setAnswers] = useState<Record<string, string>>(
    Array.from({ length: 40 }, (_, i) => i + 1).reduce(
      (acc, i) => ({ ...acc, [`q${i}`]: item[`q${i}` as keyof IReadingTestAnswer] || '' }),
      {}
    )
  );

  const activeImageUrl =
    activeIndex === 1 ? item.img1 || '' :
    activeIndex === 2 ? item.img2 || '' :
    activeIndex === 3 ? item.img3 || '' :
    '';

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await deleteData(READING_TESTS_COLLECTION, item.id);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await updateReadingTestAnswer(item.id, { ...item, feedback, ...answers });
      setIsLoading(false);
      alert('Feedback and answers updated successfully');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setAnswers({ ...answers, [`q${index}`]: value });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {item.img1 && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 1 })}
            onClick={() => setActiveIndex(1)}>
            <FontAwesomeIcon icon={faImage} />
          </div>
        )}
        {item.img2 && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 2 })}
            onClick={() => setActiveIndex(2)}>
            <FontAwesomeIcon icon={faImage} />
          </div>
        )}
        {item.img3 && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 3 })}
            onClick={() => setActiveIndex(3)}>
            <FontAwesomeIcon icon={faImage} />
          </div>
        )}
        <div
          className={classNames(styles.button, { [styles.active]: activeIndex === 4 })}
          onClick={() => setActiveIndex(4)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
      </div>
      <div className={styles.block}>
        <div>
          <p className={styles.title}>Part</p>
          <h4 className={styles.text}>{item.part}</h4>
        </div>
        <div className={styles.btns}>
          {isOpen && (
            <>
              <div className={styles.btn} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faBan} />
              </div>
              <div className={classNames(styles.btn, styles.blue)} onClick={handleDelete}>
                {isLoading ? <Loader size={16} border={3} /> : <FontAwesomeIcon icon={faCheck} />}
              </div>
            </>
          )}
        </div>
      </div>
      {item.student && (
        <div className={styles.student}>
          <p className={styles.title}>Student</p>
          <h4 className={styles.text}>{item.student}</h4>
        </div>
      )}
      {(activeIndex === 1 || activeIndex === 2 || activeIndex === 3) && (
        <div className={styles.content}>
          <p className={styles.title}>Image №{activeIndex}</p>
          <ImageViewer imageUrl={activeImageUrl} />
        </div>
      )}
      {activeIndex === 4 && (
        <form onSubmit={handleUpdate} className={styles.form}>
          <div className={styles.grid}>
            {[...Array(40)].map((_, i) => (
              <div key={i} className={styles.inputRow}>
                <label className={styles.label}>Question №{i + 1}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={answers[`q${i + 1}`]}
                  onChange={(e) => handleInputChange(i + 1, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className={styles.inputRow}>
            <label className={styles.label}>Feedback</label>
            <textarea
              className={styles.input}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <Button text="Assess" onClick={handleUpdate} isLoading={isLoading} />
          </form>
      )}
    </div>
  );
};

export default ReadingTestAnswerCard;
