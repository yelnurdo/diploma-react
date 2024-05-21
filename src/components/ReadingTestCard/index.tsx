import { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { IReadingTest } from "@utils/interfaces";
import styles from "./ReadingTestCard.module.scss";

interface Props {
  item: IReadingTest;
}

const ReadingTestCard: React.FC<Props> = ({ item }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);

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
        {!(item.img1 && item.img2 && item.img3) && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 4 })}
            onClick={() => setActiveIndex(4)}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
      </div>
      <div>
        <p className={styles.title}>Part</p>
        <h4 className={styles.text}>{item.part}</h4>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>Image №{activeIndex}</p>
        <div className={styles.image}>
          <div className={styles.scroll}>
            <img src={item.img1} alt={item.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingTestCard;
