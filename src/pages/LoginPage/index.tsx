import { FormEvent, useState } from "react";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { firebaseAuthSignIn } from "@my-firebase/auth";
import { setUser } from "@redux/slices/userSlice";
import { useAppDispatch } from "@hooks/reduxHooks";
import Input from "@components/Input";
import Button from "@components/Button";
import { getErrorMessage } from "@utils/errors";
import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      const result = await firebaseAuthSignIn(email, password);
      if (typeof result === "string") {
        setError(getErrorMessage(result));
      } else {
        setError("Signed in successfully");
        dispatch(setUser(result));
      }
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
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
