import styles from "./Loader.module.scss";

interface Props {
  size?: number;
  border?: number;
}

const Loader: React.FC<Props> = ({ size, border }) => {
  return (
    <span
      style={
        size || border
          ? { width: `${size}px`, height: `${size}px`, borderWidth: `${border}px` }
          : {}
      }
      className={styles.loader}></span>
  );
};

export default Loader;
