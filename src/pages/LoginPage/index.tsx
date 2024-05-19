import { FormEvent, useState } from "react";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./LoginPage.module.scss";
import { firebaseAuthSignIn } from "../../firebase/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      await firebaseAuthSignIn(email, password);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Log in to Admin Panel</h2>
        <form className={styles.form} onSubmit={signIn}>
          <Input
            title="E-mail"
            placeholder="Enter your e-mail"
            icon={faAt}
            value={email}
            setValue={setEmail}
          />
          <Input
            title="Password"
            placeholder="Enter your password"
            icon={faLock}
            type="password"
            value={password}
            setValue={setPassword}
          />
          <Button text="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
