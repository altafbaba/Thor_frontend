export interface IUser {
  asObservable(): import("rxjs").Observable<IUser>;
  _id?: string;
  uName: String;
  password: String;
  role:"Admin" | "Standard";
  isActive?: string;
}
