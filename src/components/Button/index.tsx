import Loader from "@components/Loader";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  isLoading?: boolean;
  onClick?: () => void; // Добавляем пропс onClick
}

const Button: React.FC<Props> = ({ text, isLoading, onClick }) => {
  return (
    <button className={styles.button} type="submit" onClick={onClick}>
      {isLoading ? <Loader size={18} border={3} /> : text}
    </button>
  );
};

export default Button;
