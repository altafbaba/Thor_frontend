export interface IUser {
  _id?: string;
  uName: String;
  password?: string;
  role:"Admin" | "Standard";
  permissions?:IPermissions[];
}


export enum IPermissions{

  Admin = "Admin",
  Standard = "Standard"
}