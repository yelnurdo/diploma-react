import { FormEvent, ChangeEvent, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { uploadImage } from "@my-firebase/storage";
import { updateReadingTaskUploadedImage } from "@my-firebase/firestore";
import Button from "@components/Button";
import { IReadingTest } from "@utils/interfaces";
import styles from "./ReadingTestCard.module.scss";

interface Props {
  item: IReadingTest;
}

const ReadingTestCard: React.FC<Props> = ({ item }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        const url = await uploadImage(file);
        await updateReadingTaskUploadedImage(item.id, url, !item.img2);
        !!item.img2 ? item.img2 === url : item.img3 === url;
        setIsLoading(false);
        window.location.reload();
      } catch (error) {
        console.error("Upload failed", error);
      }
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
      </div>
      <div>
        <p className={styles.title}>Part</p>
        <h4 className={styles.text}>{item.part}</h4>
      </div>

      {(activeIndex === 1 || activeIndex === 2 || activeIndex === 3) && (
        <div className={styles.content}>
          <p className={styles.title}>Image №{activeIndex}</p>
          <div className={styles.image}>
            <div className={styles.scroll}>
              <img src={activeImageUrl} alt={item.id} />
            </div>
          </div>
        </div>
      )}
      {activeIndex === 4 && (
        <form onSubmit={handleUpload} className={styles.form}>
          <input type="file" onChange={handleFileChange} id="image" accept="image/*" />
          {file ? (
            <div>
              <p className={styles.title}>Image Preview</p>
              <div className={styles.image}>
                <div className={styles.scroll}>
                  <img src={URL.createObjectURL(file)} alt={item.id} />
                </div>
              </div>
            </div>
          ) : (
            <label htmlFor="image" className={styles.uploader}>
              <FontAwesomeIcon icon={faImage} />
              <p>Choose image</p>
            </label>
          )}
          <Button text="Upload Image" isLoading={isLoading} />
        </form>
      )}
    </div>
  );
};

export default ReadingTestCard;
