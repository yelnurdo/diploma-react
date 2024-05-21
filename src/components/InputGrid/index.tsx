import { useState, ChangeEvent, FormEvent } from "react";
import { updateData } from "@my-firebase/firestore";
import Button from "@components/Button";
import { IReadingTest } from "@utils/interfaces";
import { READING_TESTS_COLLECTION } from "@utils/consts";
import styles from "./InputGrid.module.scss";

interface Props {
  test: IReadingTest;
}

const InputGrid: React.FC<Props> = ({ test }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<IReadingTest>(test);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await updateData(READING_TESTS_COLLECTION, test.id, inputs);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleUpdate}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {Array.from({ length: 40 }, (_, i) => {
            const key = `q${i + 1}` as keyof IReadingTest;
            return (
              <div key={i}>
                <h4 className={styles.title}>Question №{i + 1}</h4>
                <input
                  type="text"
                  name={key}
                  value={inputs[key]}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Button text="Update" isLoading={isLoading} />
    </form>
  );
};

export default InputGrid;
