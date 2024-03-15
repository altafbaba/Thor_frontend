export interface IUser {
  _id?: string;
  uName: String;
  password: String;
  role:"Admin" | "Standard";
  isActive?: string;
}
