import { useAuth } from "@hooks/useAuth";
import styles from "./Layout.module.scss";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { isAuth } = useAuth();

  return isAuth ? <div>{children}</div> : <div className={styles.layout}>{children}</div>;
};

export default Layout;
