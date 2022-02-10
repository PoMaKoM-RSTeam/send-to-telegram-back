import { Schema } from 'mongoose';

export interface IUserModel {
  id: number;
  role: number;
  first_name: string;
  username: string;
  auth_date: Date;
  hash: string;
}
export interface IChannelModel {
  id: number;
  username: string;
  title: string;
  invite_link: string;
  photo: string;
}
export interface IPostModel {
  id: number;
  userId: Schema.Types.ObjectId;
  channelId: Schema.Types.ObjectId;
  date: Date;
  text: string;
  photo: string;
}
export interface IRoleModel {
  name: string;
  can_change_info: boolean;
  can_post_messages: boolean;
  can_edit_messages: boolean;
  can_delete_messages: boolean;
}
export interface IUsersChannelsRolesModel {
  userId: Schema.Types.ObjectId;
  roleId: Schema.Types.ObjectId;
  channelId: Schema.Types.ObjectId;
}
