import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className, isLoading }) => (
  <button onClick={onClick} className={classNames(styles.button, className)}>
    {isLoading ? 'Loading...' : text}
  </button>
);

export default Button;
