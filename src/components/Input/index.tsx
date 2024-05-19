import { HTMLInputTypeAttribute } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./Input.module.scss";

interface Props {
  title: string;
  placeholder: string;
  icon?: IconDefinition;
  type?: HTMLInputTypeAttribute;
}

const Input: React.FC<Props> = ({ title, placeholder, icon, type = "text" }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <div className={icon ? styles.block : ""}>
        <input className={styles.input} placeholder={placeholder} type={type} />
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
    </div>
  );
};

export default Input;
