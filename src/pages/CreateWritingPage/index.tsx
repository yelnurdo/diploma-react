import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { addNewWritingTest } from "@my-firebase/firestore";
import Header from "@components/Header";
import Input from "@components/Input";
import ImageUploader from "@components/ImageUploader";
import Button from "@components/Button";
import { IWritingTest } from "@utils/interfaces";
import { WRITING_PAGE_ROUTE, WRITING_TESTS_COLLECTION } from "@utils/consts";
import styles from "./CreateWritingPage.module.scss";

const CreateWritingPage: React.FC = () => {
  const navigate = useNavigate();
  const initialWritingTest: Omit<IWritingTest, "id"> = {
    part: "",
    img1: "",
    img2: "",
    q1: "",
    q2: "",
    student: "",
    studentId: "",
    wordCount1: "",
    wordCount2: ""
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState(initialWritingTest);

  const handleAddWritingTest = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!formData.part || !formData.img1) {
      setError("You should fill required fields");
      return;
    }

    setIsLoading(true);

    try {
      await addNewWritingTest(formData);
      navigate(WRITING_PAGE_ROUTE);
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the writing test");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: keyof IWritingTest, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className={styles.page}>
      <Header title="Create a new writing test" />
      <form className={styles.form} onSubmit={handleAddWritingTest}>
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
          <ImageUploader folderName={WRITING_TESTS_COLLECTION} setImage={(value) => handleChange("img1", value)} num={1} />
          <ImageUploader
            folderName={WRITING_TESTS_COLLECTION}
            setImage={(value) => handleChange("img2", value)}
            num={2}
            disabled={!formData.img1}
          />
        </div>
        <Input
          title="Question 1"
          placeholder="Enter question 1"
          value={formData.q1}
          setValue={(value) => handleChange("q1", value)}
          hasBorder={true}
          icon={faPenNib}
          required={true}
        />
        <Input
          title="Question 2"
          placeholder="Enter question 2"
          value={formData.q2}
          setValue={(value) => handleChange("q2", value)}
          hasBorder={true}
          icon={faPenNib}
          required={true}
        />
        <Button text="Create" isLoading={isLoading} />
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateWritingPage;
