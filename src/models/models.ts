import { Schema, Model } from 'mongoose';

const userSchema = new Schema({
  id: { type: Number, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  auth_date: { type: Date, required: true },
  hash: { type: String, required: true },
}, { timestamps: true });

const botSchema = new Schema({
  id: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
}, { timestamps: true });

const channelSchema = new Schema({
  id: { type: Number, required: true },
  bot: { type: Schema.Types.ObjectId, ref: 'Bot' },
  username: { type: String, required: true },
  title: { type: String, required: true },
  invite_link: { type: String, required: true },
  photo: { type: String, validate: /\.(png|jpg|jpeg|webm)$/ },
}, { timestamps: true });

const postSchema = new Schema({
  id: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  channel: { type: Schema.Types.ObjectId, ref: 'Channel' },
  date: { type: Date, required: true },
  text: { type: String, required: true },
  photo: { type: String, validate: /\.(png|jpg|jpeg|webm)$/ },
}, { timestamps: true });

const chatSchema = new Schema({
  id: { type: Number, required: true },
  bot: { type: Schema.Types.ObjectId, ref: 'Bot' },
  surname: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  photo: { type: String, validate: /\.(png|jpg|jpeg|webm)$/ },
}, { timestamps: true });

const messageSchema = new Schema({
  id: { type: Number, required: true },
  from: { type: Object, required: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
  date: { type: Date, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

const roleSchema = new Schema({
  name: { type: String, required: true },
  permission: { type: Schema.Types.ObjectId, ref: 'Permission' },
}, { timestamps: true });

const permissionSchema = new Schema({
  editOtherProfiles: { type: String, required: true },
  addChannels: { type: String, required: true },
  changeRoles: { type: String, required: true },
}, { timestamps: true });

export const userModel = new Model('User', userSchema);
export const botModel = new Model('Bot', botSchema);
export const channelModel = new Model('Model', channelSchema);
export const postModel = new Model('Post', postSchema);
export const chatModel = new Model('Chat', chatSchema);
export const messageModel = new Model('Message', messageSchema);
export const roleModel = new Model('Role', roleSchema);
export const permissionModel = new Model('Permission', permissionSchema);
