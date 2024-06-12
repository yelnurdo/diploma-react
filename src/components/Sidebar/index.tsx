// src/components/Sidebar/index.tsx
import { faArrowRightFromBracket, faBook, faHeadphones, faPen } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@hooks/reduxHooks";
import { useAuthActions } from "@hooks/useAuthActions";
import { LISTENING_PAGE_ROUTE, READING_PAGE_ROUTE, WRITING_PAGE_ROUTE, LISTENING_ANSWERS_ROUTE, READING_ANSWERS_ROUTE, WRITING_ANSWERS_ROUTE } from "@utils/consts";
import SidebarLink from "./SidebarLink";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
  const { signOut } = useAuthActions();
  const userEmail = useAppSelector(state => state.user.email);

  const logOut = async () => {
    await signOut();
  };

  const adminLinks = (
    <>
      <SidebarLink icon={faBook} title="Reading Part" link={READING_PAGE_ROUTE} />
      <SidebarLink icon={faHeadphones} title="Listening Part" link={LISTENING_PAGE_ROUTE} />
      <SidebarLink icon={faPen} title="Writing Part" link={WRITING_PAGE_ROUTE} />
    </>
  );

  const teacherLinks = (
    <>
      <SidebarLink icon={faHeadphones} title="Listening Answers" link={LISTENING_ANSWERS_ROUTE} />
      <SidebarLink icon={faBook} title="Reading Answers" link={READING_ANSWERS_ROUTE} />
      <SidebarLink icon={faPen} title="Writing Answers" link={WRITING_ANSWERS_ROUTE} />
    </>
  );

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.logo}>
          <h2>- Destination -</h2>
          <p>Admin Panel</p>
        </div>
        {userEmail === "admin@admin.kz" ? adminLinks : teacherLinks}
      </div>
      <SidebarLink icon={faArrowRightFromBracket} title="Logout" func={logOut} />
    </div>
  );
};

export default Sidebar;
