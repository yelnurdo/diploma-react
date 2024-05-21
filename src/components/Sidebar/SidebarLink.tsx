import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Sidebar.module.scss";

interface Props {
  title: string;
  link?: string;
  icon: IconDefinition;
  func?: () => void;
}

const SidebarLink: React.FC<Props> = ({ title, link, icon, func }) => {
  return link ? (
    <Link to={link} className={styles.link}>
      <FontAwesomeIcon icon={icon} />
      <p>{title}</p>
    </Link>
  ) : (
    <button className={styles.link} onClick={func}>
      <FontAwesomeIcon icon={icon} />
      <p>{title}</p>
    </button>
  );
};

export default SidebarLink;
