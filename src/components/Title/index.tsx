import styles from "./Title.module.scss";

interface Props {
  title: string;
}

const Title: React.FC<Props> = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};

export default Title;
