import { useState, ChangeEvent, FormEvent } from "react";
import { updateData } from "@my-firebase/firestore";
import Button from "@components/Button";
import { IReadingTest, IWritingTest } from "@utils/interfaces";
import styles from "./InputGrid.module.scss";

interface Props {
  test: IReadingTest | IWritingTest;
  collection: string;
}

const InputGrid: React.FC<Props> = ({ test, collection }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<IReadingTest | IWritingTest>(test);

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
      await updateData(collection, test.id, inputs);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Определяем количество вопросов в зависимости от типа теста
  const questionCount = 'img3' in test ? 40 : 2;

  return (
    <form className={styles.form} onSubmit={handleUpdate}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {Array.from({ length: questionCount }, (_, i) => {
            const key = `q${i + 1}` as keyof (IReadingTest | IWritingTest);
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
      <Button text="Update" isLoading={isLoading} onClick={() => {}} />
      </form>
  );
};

export default InputGrid;
