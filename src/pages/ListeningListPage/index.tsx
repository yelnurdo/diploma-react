import Header from "@components/Header";
import { CREATE_LISTENING_PAGE_ROUTE } from "@utils/consts";
import styles from "./ListeningListPage.module.scss";

const ListeningListPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header title="Listening Tests" link={CREATE_LISTENING_PAGE_ROUTE} />
    </div>
  );
};

export default ListeningListPage;
