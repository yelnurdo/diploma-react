import Loader from "@components/Loader";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({ text, isLoading }) => {
  return (
    <button className={styles.button} type="submit">
      {isLoading ? <Loader size={18} border={3} /> : text}
    </button>
  );
};

export default Button;
