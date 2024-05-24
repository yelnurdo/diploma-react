import { ChangeEvent, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { uploadImage } from "@my-firebase/storage";
import Loader from "@components/Loader";
import AudioPlayer from "@components/AudioPlayer";
import styles from "./AudioUploader.module.scss";

interface Props {
  folderName: string;
  setAudio: (value: string) => void;
  num: number;
  disabled?: boolean;
}

const AudioUploader: React.FC<Props> = ({ folderName, setAudio, num, disabled = false }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        setIsLoading(true);
        setFile(e.target.files[0]);
        const url = await uploadImage(folderName, e.target.files[0]);
        setAudio(url);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={classNames(styles.form, { [styles.disabled]: disabled })}>
      <h4>
        Upload Audio №{num}
        {num === 1 && <span>*</span>}
      </h4>
      <input type="file" onChange={handleFileChange} id={`audio${num}`} accept="audio/*" />
      {isLoading ? (
        <Loader isLarge={true} />
      ) : file ? (
        <div>
          <p className={styles.title}>Audio Preview</p>
          <AudioPlayer audioUrl={URL.createObjectURL(file)} />
        </div>
      ) : (
        <label htmlFor={`audio${num}`} className={styles.uploader}>
          <FontAwesomeIcon icon={faVolumeHigh} />
          <p>Choose audio</p>
        </label>
      )}
    </div>
  );
};

export default AudioUploader;
