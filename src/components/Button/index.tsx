import styles from "./Button.module.scss";

interface Props {
  text: string;
}

const Button: React.FC<Props> = ({ text }) => {
  return (
    <button className={styles.button} type="submit">
      {text}
    </button>
  );
};

export default Button;
