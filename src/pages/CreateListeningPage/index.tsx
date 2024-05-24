import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { addNewListeningTest } from "@my-firebase/firestore";
import Header from "@components/Header";
import Input from "@components/Input";
import ImageUploader from "@components/ImageUploader";
import Button from "@components/Button";
import AudioUploader from "@components/AudioUploader";
import { IListeningTest } from "@utils/interfaces";
import { LISTENING_PAGE_ROUTE, LISTENING_TESTS_COLLECTION } from "@utils/consts";
import styles from "./CreateListeningPage.module.scss";

const CreateListeningPage: React.FC = () => {
  const navigate = useNavigate();
  const initialListeningTest: Omit<
    IListeningTest,
    "part" | "img1" | "img2" | "img3" | "img4" | "audio1" | "audio2" | "audio3" | "audio4"
  > = {
    id: "",
    student: "",
    studentId: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
    q12: "",
    q13: "",
    q14: "",
    q15: "",
    q16: "",
    q17: "",
    q18: "",
    q19: "",
    q20: "",
    q21: "",
    q22: "",
    q23: "",
    q24: "",
    q25: "",
    q26: "",
    q27: "",
    q28: "",
    q29: "",
    q30: "",
    q31: "",
    q32: "",
    q33: "",
    q34: "",
    q35: "",
    q36: "",
    q37: "",
    q38: "",
    q39: "",
    q40: ""
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [part, setPart] = useState<string>("");
  const [img1, setImg1] = useState<string>("");
  const [img2, setImg2] = useState<string>("");
  const [img3, setImg3] = useState<string>("");
  const [img4, setImg4] = useState<string>("");
  const [audio1, setAudio1] = useState<string>("");
  const [audio2, setAudio2] = useState<string>("");
  const [audio3, setAudio3] = useState<string>("");
  const [audio4, setAudio4] = useState<string>("");

  const handleAddListeningTest = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!part || !img1) {
      setError("You should fill required fields");
      return;
    }

    setIsLoading(true);

    try {
      await addNewListeningTest({
        ...initialListeningTest,
        part,
        img1,
        img2,
        img3,
        img4,
        audio1,
        audio2,
        audio3,
        audio4
      });
      navigate(LISTENING_PAGE_ROUTE);
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the reading test");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Header title="Create a new listening test" />
      <form className={styles.form} onSubmit={handleAddListeningTest}>
        <Input
          title="Part name"
          placeholder="Enter test's part"
          value={part}
          setValue={setPart}
          hasBorder={true}
          icon={faPenNib}
          required={true}
        />
        <div className={styles.grid}>
          <ImageUploader folderName={LISTENING_TESTS_COLLECTION} setImage={setImg1} num={1} />
          <ImageUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setImage={setImg2}
            num={2}
            disabled={!img1 || !audio1}
          />
          <ImageUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setImage={setImg3}
            num={3}
            disabled={!img1 || !audio1 || !img2 || !audio2}
          />
          <ImageUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setImage={setImg4}
            num={4}
            disabled={!img1 || !audio1 || !img2 || !audio2 || !img3 || !audio3}
          />
        </div>
        <div className={styles.grid}>
          <AudioUploader folderName={LISTENING_TESTS_COLLECTION} setAudio={setAudio1} num={1} />
          <AudioUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setAudio={setAudio2}
            num={2}
            disabled={!img1 || !audio1}
          />
          <AudioUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setAudio={setAudio3}
            num={3}
            disabled={!img1 || !audio1 || !img2 || !audio2}
          />
          <AudioUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setAudio={setAudio4}
            num={4}
            disabled={!img1 || !audio1 || !img2 || !audio2 || !img3 || !audio3}
          />
        </div>
        <Button text="Create" isLoading={isLoading} />
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateListeningPage;
