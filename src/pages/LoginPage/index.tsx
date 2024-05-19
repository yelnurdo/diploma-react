import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Log in to Admin Panel</h2>
        <form className={styles.form}>
          <Input title="E-mail" placeholder="Enter your e-mail" icon={faAt} />
          <Input title="Password" placeholder="Enter your password" icon={faLock} type="password" />
          <Button text="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
