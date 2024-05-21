import styles from "./Loader.module.scss";

interface Props {
  size?: number;
  border?: number;
  isFull?: boolean;
}

const Loader: React.FC<Props> = ({ size, border, isFull = false }) => {

  if (isFull) {
    return (
      <div className={styles.full}>
        <span></span>
      </div>
    )
  }

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
