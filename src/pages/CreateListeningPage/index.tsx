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
  const initialListeningTest: Omit<IListeningTest, "id"> = {
    part: "",
    student: "",
    studentId: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    audio1: "",
    audio2: "",
    audio3: "",
    audio4: "",
    feedback: "",
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
  const [formData, setFormData] = useState(initialListeningTest);

  const handleAddListeningTest = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!formData.part || !formData.img1) {
      setError("You should fill required fields");
      return;
    }

    setIsLoading(true);

    try {
      await addNewListeningTest(formData);
      navigate(LISTENING_PAGE_ROUTE);
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the listening test");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: keyof IListeningTest, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className={styles.page}>
      <Header title="Create a new listening test" />
      <form className={styles.form} onSubmit={handleAddListeningTest}>
        <Input
          title="Part name"
          placeholder="Enter test's part"
          value={formData.part}
          setValue={(value) => handleChange("part", value)}
          hasBorder={true}
          icon={faPenNib}
          required={true}
        />
        <div className={styles.grid}>
          <ImageUploader folderName={LISTENING_TESTS_COLLECTION} setImage={(value) => handleChange("img1", value)} num={1} />
          <ImageUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setImage={(value) => handleChange("img2", value)}
            num={2}
            disabled={!formData.img1}
          />
          <ImageUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setImage={(value) => handleChange("img3", value)}
            num={3}
            disabled={!formData.img1 || !formData.img2}
          />
          <ImageUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setImage={(value) => handleChange("img4", value)}
            num={4}
            disabled={!formData.img1 || !formData.img2 || !formData.img3}
          />
        </div>
        <div className={styles.grid}>
          <AudioUploader folderName={LISTENING_TESTS_COLLECTION} setAudio={(value) => handleChange("audio1", value)} num={1} />
          <AudioUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setAudio={(value) => handleChange("audio2", value)}
            num={2}
            disabled={!formData.img1 || !formData.audio1}
          />
          <AudioUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setAudio={(value) => handleChange("audio3", value)}
            num={3}
            disabled={!formData.img1 || !formData.audio1 || !formData.img2 || !formData.audio2}
          />
          <AudioUploader
            folderName={LISTENING_TESTS_COLLECTION}
            setAudio={(value) => handleChange("audio4", value)}
            num={4}
            disabled={!formData.img1 || !formData.audio1 || !formData.img2 || !formData.audio2 || !formData.img3 || !formData.audio3}
          />
        </div>
        <Button text="Create" onClick={() => handleAddListeningTest} isLoading={isLoading} />
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateListeningPage;