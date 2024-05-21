import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import classNames from "classnames";
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
  hasBorder?: boolean;
  required?: boolean;
}

const Input: React.FC<Props> = ({
  title,
  placeholder,
  value,
  setValue,
  icon,
  type = "text",
  hasBorder = false,
  required = false
}) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        {title}
        {required && <span>*</span>}
      </p>
      <div className={classNames({ [styles.block]: icon })}>
        <input
          className={classNames(styles.input, { [styles.border]: hasBorder })}
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
