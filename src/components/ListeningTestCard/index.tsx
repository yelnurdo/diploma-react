import { FormEvent, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faFolderClosed,
  // faPenToSquare,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { deleteData } from "@my-firebase/firestore";
import InputGrid from "@components/InputGrid";
import ImageViewer from "@components/ImageViewer";
import Loader from "@components/Loader";
import AudioPlayer from "@components/AudioPlayer";
import { IListeningTest } from "@utils/interfaces";
import { LISTENING_TESTS_COLLECTION } from "@utils/consts";
import styles from "./ListeningTestCard.module.scss";

interface Props {
  item: IListeningTest;
}

const ListeningTestCard: React.FC<Props> = ({ item }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const activeImageUrl =
    activeIndex === 1
      ? item.img1
      : activeIndex === 2
      ? item.img2
      : activeIndex === 3
      ? item.img3
      : item.img4;
  const activeAudioUrl =
    activeIndex === 1
      ? item.audio1
      : activeIndex === 2
      ? item.audio2
      : activeIndex === 3
      ? item.audio3
      : item.audio4;

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await deleteData(LISTENING_TESTS_COLLECTION, item.id);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {item.img1 && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 1 })}
            onClick={() => setActiveIndex(1)}>
            <FontAwesomeIcon icon={faFolderClosed} />
          </div>
        )}
        {item.img2 && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 2 })}
            onClick={() => setActiveIndex(2)}>
            <FontAwesomeIcon icon={faFolderClosed} />
          </div>
        )}
        {item.img3 && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 3 })}
            onClick={() => setActiveIndex(3)}>
            <FontAwesomeIcon icon={faFolderClosed} />
          </div>
        )}
        {item.img4 && (
          <div
            className={classNames(styles.button, { [styles.active]: activeIndex === 4 })}
            onClick={() => setActiveIndex(4)}>
            <FontAwesomeIcon icon={faFolderClosed} />
          </div>
        )}
        {/* <div
          className={classNames(styles.button, { [styles.active]: activeIndex === 5 })}
          onClick={() => setActiveIndex(5)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div> */}
      </div>
      <div className={styles.block}>
        <div>
          <p className={styles.title}>Part</p>
          <h4 className={styles.text}>{item.part}</h4>
        </div>
        <div className={styles.btns}>
          {isOpen ? (
            <>
              <div className={styles.btn} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faBan} />
              </div>
              <div className={classNames(styles.btn, styles.blue)} onClick={handleDelete}>
                {isLoading ? <Loader size={16} border={3} /> : <FontAwesomeIcon icon={faCheck} />}
              </div>
            </>
          ) : (
            <div className={styles.btn} onClick={() => setIsOpen(true)}>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          )}
        </div>
      </div>
      {item.student && (
        <div className={styles.student}>
          <p className={styles.title}>Student</p>
          <h4 className={styles.text}>{item.student}</h4>
        </div>
      )}
      {(activeIndex === 1 || activeIndex === 2 || activeIndex === 3 || activeIndex === 4) && (
        <div className={styles.content}>
          <p className={styles.title}>Image №{activeIndex}</p>
          <ImageViewer imageUrl={activeImageUrl} />
          <p className={styles.title} style={{ marginTop: 16 }}>
            Audio №{activeIndex}
          </p>
          <AudioPlayer audioUrl={activeAudioUrl} />
        </div>
      )}

      {activeIndex === 5 && <InputGrid test={item} collection={LISTENING_TESTS_COLLECTION} />}
    </div>
  );
};

export default ListeningTestCard;
