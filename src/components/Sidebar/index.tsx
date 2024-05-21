import { faArrowRightFromBracket, faBook, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { removeUser } from "@redux/slices/userSlice";
import { useAppDispatch } from "@hooks/reduxHooks";
import { firebaseAuthSignOut } from "@my-firebase/auth";
import { LISTENING_PAGE_ROUTE, READING_PAGE_ROUTE } from "@utils/consts";
import SidebarLink from "./SidebarLink";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const logOut = async () => {
    await firebaseAuthSignOut();
    dispatch(removeUser());
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.logo}>
          <h2>- Destination -</h2>
          <p>Admin Panel</p>
        </div>
        <SidebarLink icon={faBook} title="Reading Part" link={READING_PAGE_ROUTE} />
        <SidebarLink icon={faHeadphones} title="Listening Part" link={LISTENING_PAGE_ROUTE} />
      </div>
      <SidebarLink icon={faArrowRightFromBracket} title="Logout" func={logOut} />
    </div>
  );
};

export default Sidebar;
