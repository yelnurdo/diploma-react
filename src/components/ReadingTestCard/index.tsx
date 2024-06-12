import { FormEvent, ChangeEvent, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faImage, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { uploadImage } from "@my-firebase/storage";
import { deleteData, updateReadingTaskUploadedImage } from "@my-firebase/firestore";
import Button from "@components/Button";
import InputGrid from "@components/InputGrid";
import ImageViewer from "@components/ImageViewer";
import Loader from "@components/Loader";
import { IReadingTest } from "@utils/interfaces";
import { READING_TESTS_COLLECTION } from "@utils/consts";
import styles from "./ReadingTestCard.module.scss";

interface Props {
  item: IReadingTest;
}

const ReadingTestCard: React.FC<Props> = ({ item }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const activeImageUrl = activeIndex === 1 ? item.img1 : activeIndex === 2 ? item.img2 : item.img3;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();
    if (file) {
      try {
        setIsLoading(true);
        const url = await uploadImage(READING_TESTS_COLLECTION, file);
        if (!item.img1) {
          await updateReadingTaskUploadedImage(item.id, url, false);
          item.img1 = url;
        } else if (!item.img2) {
          await updateReadingTaskUploadedImage(item.id, url, true);
          item.img2 = url;
        } else {
          await updateReadingTaskUploadedImage(item.id, url, false);
          item.img3 = url;
        }
        setIsLoading(false);
        window.location.reload();
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

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
      {(activeIndex === 1 || activeIndex === 2 || activeIndex === 3) && (
        <div className={styles.content}>
          <p className={styles.title}>Image №{activeIndex}</p>
          <ImageViewer imageUrl={activeImageUrl} />
        </div>
      )}
      {activeIndex === 4 && (
        <form onSubmit={handleUpload} className={styles.form}>
          <input type="file" onChange={handleFileChange} id="image" accept="image/*" />
          {file ? (
            <div>
              <p className={styles.title}>Image Preview</p>
              <ImageViewer imageUrl={URL.createObjectURL(file)} />
            </div>
          ) : (
            <label htmlFor="image" className={styles.uploader}>
              <FontAwesomeIcon icon={faImage} />
              <p>Choose image</p>
            </label>
          )}
<Button text="Upload Image" onClick={() => handleUpload} isLoading={isLoading} />
</form>
      )}
      {activeIndex === 5 && <InputGrid test={item} collection={READING_TESTS_COLLECTION} />}
    </div>
  );
};

export default ReadingTestCard;
