import { HTMLInputTypeAttribute, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./Input.module.scss";

interface Props {
  title: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  icon?: IconDefinition;
  type?: HTMLInputTypeAttribute;
}

const Input: React.FC<Props> = ({ title, placeholder, value, setValue, icon, type = "text" }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <div className={icon ? styles.block : ""}>
        <input
          className={styles.input}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
    </div>
  );
};

export default Input;
