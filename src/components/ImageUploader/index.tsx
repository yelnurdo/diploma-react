import { ChangeEvent, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { uploadImage } from "@my-firebase/storage";
import ImageViewer from "@components/ImageViewer";
import Loader from "@components/Loader";
import { READING_TESTS_COLLECTION } from "@utils/consts";
import styles from "./ImageUploader.module.scss";

interface Props {
  setImage: (value: string) => void;
  num: number;
  disabled?: boolean;
}

const ImageUploader: React.FC<Props> = ({ setImage, num, disabled = false }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        setIsLoading(true);
        setFile(e.target.files[0]);
        const url = await uploadImage(READING_TESTS_COLLECTION, e.target.files[0]);
        setImage(url);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={classNames(styles.form, { [styles.disabled]: disabled })}>
      <h4>
        Upload Image №{num}
        {num === 1 && <span>*</span>}
      </h4>
      <input type="file" onChange={handleFileChange} id={`image${num}`} accept="image/*" />
      {isLoading ? (
        <Loader isLarge={true} />
      ) : file ? (
        <div>
          <p className={styles.title}>Image Preview</p>
          <ImageViewer imageUrl={URL.createObjectURL(file)} />
        </div>
      ) : (
        <label htmlFor={`image${num}`} className={styles.uploader}>
          <FontAwesomeIcon icon={faImage} />
          <p>Choose image</p>
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
