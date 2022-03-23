import { Schema } from 'mongoose';
import { TelegramLoginPayload } from 'node-telegram-login';
import { AttachAnimation, AttachAudio, AttachDocument, AttachPhoto, AttachVideo, PostCaption } from '../bot/types/post';

export type IUserModel = TelegramLoginPayload;
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
  date?: string;
  text?: PostCaption;
  attachments?: Array<AttachPhoto | AttachVideo | AttachAnimation | AttachAudio | AttachDocument>;
  scheduleDateTime?: Date;
}
export interface IRoleModel {
  name: string;
  can_change_info: boolean;
  can_post_messages: boolean;
  can_edit_messages: boolean;
  can_delete_messages: boolean;
  can_give_channel_access: boolean;
  can_delete_channel_member: boolean;
  can_edit_channel_member: boolean;
  can_delete_channel: boolean;
}
export interface IUsersChannelsRolesModel {
  userId: Schema.Types.ObjectId;
  roleId: Schema.Types.ObjectId;
  channelId: Schema.Types.ObjectId;
}
