import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { privateRoutes, publicRoutes } from "@utils/routes";
import { LOGIN_PAGE_ROUTE, READING_PAGE_ROUTE } from "@utils/consts";
import { IAppRoute } from "@utils/interfaces";

const AppRouter: React.FC = () => {
  const { isAuth } = useAuth();
  const routesToRender: IAppRoute[] = isAuth ? privateRoutes : publicRoutes;

  return (
    <Routes>
      {routesToRender.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
      <Route
        path="*"
        element={<Navigate to={isAuth ? READING_PAGE_ROUTE : LOGIN_PAGE_ROUTE} />}
      />
    </Routes>
  );
};

export default AppRouter;