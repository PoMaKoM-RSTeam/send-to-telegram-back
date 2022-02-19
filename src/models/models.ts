import { Schema, model } from 'mongoose';
import {
  IChannelModel,
  IPostModel,
  IRoleModel,
  IUserModel,
  IUsersChannelsRolesModel,
} from '../interfaces/modelsInterfaces';

const userSchema = new Schema<IUserModel>(
  {
    id: { type: Number, required: true },
    // role: { type: Schema.Types.ObjectId, ref: 'Role' },
    first_name: { type: String, required: true },
    username: { type: String, required: true },
    auth_date: { type: Date, required: true },
    hash: { type: String, required: true },
  },
  { timestamps: true }
);

const botSchema = new Schema(
  {
    id: { type: Number, required: true },
    user: { type: String, required: true },
    // user: { type: Schema.Types.ObjectId, ref: 'User' },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

const channelSchema = new Schema<IChannelModel>(
  {
    id: { type: Number, required: true },
    username: { type: String },
    title: { type: String },
    invite_link: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);
const usersChannelsRoles = new Schema<IUsersChannelsRolesModel>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  roleId: { type: Schema.Types.ObjectId, ref: 'Role' },
  channelId: { type: Schema.Types.ObjectId, ref: 'Channel' },
});

const postAttachment = new Schema({ type: String, mediaId: String });

const postSchema = new Schema<IPostModel>(
  {
    id: { type: Number, required: false },
    channelId: { type: Number, required: true },
    date: { type: Date, required: false },
    text: { type: Object, required: false },
    attachments: { type: [postAttachment], required: false },
  },
  { timestamps: true }
);

const chatSchema = new Schema(
  {
    id: { type: Number, required: true },
    botId: { type: Schema.Types.ObjectId, ref: 'Bot' },
    surname: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    photo: { type: String, validate: /\.(png|jpg|jpeg|webm)$/ },
  },
  { timestamps: true }
);

const messageSchema = new Schema(
  {
    id: { type: Number, required: true },
    from: { type: Object, required: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    date: { type: Date, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const roleSchema = new Schema<IRoleModel>(
  {
    name: { type: String, required: true },
    can_change_info: { type: Boolean, required: true },
    can_post_messages: { type: Boolean, required: true },
    can_edit_messages: { type: Boolean, required: true },
    can_delete_messages: { type: Boolean, required: true },
    can_give_channel_access: { type: Boolean, required: true },
    can_delete_channel_member: { type: Boolean, required: true },
    can_edit_channel_member: { type: Boolean, required: true },
    can_delete_channel: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const userModel = model('User', userSchema);
const botModel = model('Bot', botSchema);
const channelModel = model('Channel', channelSchema);
export const PostModel = model('Post', postSchema);
const chatModel = model('Chat', chatSchema);
const messageModel = model('Message', messageSchema);
const roleModel = model('Role', roleSchema);
const usersChannelsRolesModel = model('UsersChannelRoles', usersChannelsRoles);

export default {
  userModel,
  botModel,
  channelModel,
  PostModel,
  chatModel,
  messageModel,
  roleModel,
  usersChannelsRolesModel,
};
