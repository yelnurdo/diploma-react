import { useAuth } from "@hooks/useAuth";
import styles from "./Layout.module.scss";
import Sidebar from "@components/Sidebar";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  ) : (
    <div className={styles.layout}>{children}</div>
  );
};

export default Layout;
