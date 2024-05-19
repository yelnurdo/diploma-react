import { useAuth } from "../../hooks/useAuth";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return <div>{children}</div>;
};

export default Layout;
