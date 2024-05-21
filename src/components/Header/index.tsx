import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";

interface Props {
  title: string;
  link?: string;
}

const Header: React.FC<Props> = ({ title, link }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {link && (
        <Link to={link} className={styles.link}>
          <FontAwesomeIcon icon={faPlus} />
          <p>Create</p>
        </Link>
      )}
    </div>
  );
};

export default Header;
