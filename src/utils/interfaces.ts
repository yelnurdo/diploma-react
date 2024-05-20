export interface IUser {
  email: string;
  uid: string;
  token: string;
}

export interface IAppRoute {
  path: string;
  element: React.FC;
}