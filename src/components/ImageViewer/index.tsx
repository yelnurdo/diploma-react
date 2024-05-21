import styles from "./ImageViewer.module.scss";

interface Props {
  imageUrl: string;
}
const ImageViewer: React.FC<Props> = ({ imageUrl }) => {
  return (
    <div className={styles.image}>
      <div className={styles.scroll}>
        <img src={imageUrl} alt={imageUrl} />
      </div>
    </div>
  );
};

export default ImageViewer;
