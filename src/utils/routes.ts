import { IAppRoute } from "./interfaces";
import { LISTENING_PAGE_ROUTE, LOGIN_PAGE_ROUTE, READING_PAGE_ROUTE } from "./consts";
import LoginPage from "@pages/LoginPage";
import ReadingListPage from "@pages/ReadingListPage";
import ListeningListPage from "@pages/ListeningListPage";

export const publicRoutes: IAppRoute[] = [
  {
    path: LOGIN_PAGE_ROUTE,
    element: LoginPage
  },
];

export const privateRoutes: IAppRoute[] = [
  {
    path: READING_PAGE_ROUTE,
    element: ReadingListPage
  },
  {
    path: LISTENING_PAGE_ROUTE,
    element: ListeningListPage
  }
];