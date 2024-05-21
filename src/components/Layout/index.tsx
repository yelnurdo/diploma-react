import { useAuth } from "@hooks/useAuth";
import Sidebar from "@components/Sidebar";
import Loader from "@components/Loader";
import styles from "./Layout.module.scss";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { isAuth, loading } = useAuth();

  console.log(loading);
  if (loading) {
    return (
      <div className={styles.layout}>
        <Loader isFull={true} />
      </div>
    );
  }

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
