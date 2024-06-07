import { IAppRoute } from "./interfaces";
import { 
  CREATE_LISTENING_PAGE_ROUTE,
  CREATE_READING_PAGE_ROUTE,
  LISTENING_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  READING_PAGE_ROUTE,
} from "./consts";
import LoginPage from "@pages/LoginPage";
import ReadingListPage from "@pages/ReadingListPage";
import WritingListPage from "@pages/WritingListPage";
import ListeningListPage from "@pages/ListeningListPage";
import CreateReadingPage from "@pages/CreateReadingPage";
import CreateListeningPage from "@pages/CreateListeningPage";
import CreateWritingPage from "@pages/CreateWritingPage";

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
  },
  {
    path: CREATE_READING_PAGE_ROUTE,
    element: CreateReadingPage
  },
  {
    path: CREATE_LISTENING_PAGE_ROUTE,
    element: CreateListeningPage
  },
  {
    path: "/writing",
    element: WritingListPage
  },
  {
    path: "/writing/create",
    element: CreateWritingPage
  }
];
