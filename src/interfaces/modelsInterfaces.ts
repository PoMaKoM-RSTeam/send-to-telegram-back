export interface IUserModel {
  id: number;
  role: number;
  first_name: string;
  last_name: string;
  username: string;
  auth_date: Date;
  hash: string;
}
