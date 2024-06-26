import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { addNewReadingTest } from "@my-firebase/firestore";
import Header from "@components/Header";
import Input from "@components/Input";
import Button from "@components/Button";
import ImageUploader from "@components/ImageUploader";
import { IReadingTest } from "@utils/interfaces";
import { READING_PAGE_ROUTE, READING_TESTS_COLLECTION } from "@utils/consts";
import styles from "./CreateReadingPage.module.scss";

const CreateReadingPage: React.FC = () => {
  const navigate = useNavigate();
  const initialReadingTest: Omit<IReadingTest, "id"> = {
    part: "",
    student: "",
    studentId: "",
    img1: "",
    img2: "",
    img3: "",
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
  const [formData, setFormData] = useState(initialReadingTest);

  const handleAddReadingTest = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!formData.part || !formData.img1) {
      setError("You should fill required fields");
      return;
    }

    setIsLoading(true);

    try {
      await addNewReadingTest(formData);
      navigate(READING_PAGE_ROUTE);
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the reading test");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: keyof IReadingTest, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className={styles.page}>
      <Header title="Create a new reading test" />
      <form className={styles.form} onSubmit={handleAddReadingTest}>
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
          <ImageUploader folderName={READING_TESTS_COLLECTION} setImage={(value) => handleChange("img1", value)} num={1} />
          <ImageUploader
            folderName={READING_TESTS_COLLECTION}
            setImage={(value) => handleChange("img2", value)}
            num={2}
            disabled={!formData.img1}
          />
          <ImageUploader
            folderName={READING_TESTS_COLLECTION}
            setImage={(value) => handleChange("img3", value)}
            num={3}
            disabled={!formData.img1 || !formData.img2}
          />
        </div>
        <Button text="Create" onClick={() => handleAddReadingTest} isLoading={isLoading} />
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateReadingPage;