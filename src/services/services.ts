import crypto from 'crypto';
import config from '../config/config';

export function checkTelegramAnswer(req) {
  const secret = crypto.createHash('sha256').update(config.TOKEN).digest();
  const checkString = `auth_date=${req.query.auth_date}
  first_name=${req.query.first_name}
  id=${req.query.id}
  username=${req.query.username}`;
  const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
  return hmac === req.query.hash;
}

export function saveUserToDataBase(req, Users) {
  const user = new Users({
    id: req.query.id,
    first_name: req.query.first_name,
    username: req.query.username,
    auth_date: req.query.auth_date,
    hash: req.query.hash,
  });
  return user;
}

export function saveBotToDataBase(ctx, Users, text) {
  const bot = new Users({
    id: ctx.me.id,
    user: ctx.update.message.from.id,
    username: ctx.update.message.from.username,
    first_name: ctx.me.first_name,
    last_name: ctx.me.first_name,
    token: text,
  });
  return bot;
}

export async function editBotInDataBase(ctx, Users, botName, newBotName) {
  const editBot = await Users.findOneAndUpdate(
    { first_name: botName },
    {
      // first_name: ctx.me.first_name,
      last_name: ctx.me.last_name,
      username: ctx.me.username,
      token: newBotName,
      upsert: true,
      useFindAndModify: false,
    }
  );
  return editBot;
}

export async function showAllUserBotsFromDataBase(ctx, Users) {
  const showAllUserBot = await Users.find({ user: ctx.callbackQuery.from.id });
  return showAllUserBot.join(' ');
}

export async function deleteBotFromDataBase(ctx, Users, text) {
  const deleteBot = await Users.deleteOne({ first_name: text });
  return deleteBot;
}

/// ///////////////////////////
export function saveChannelToDataBase(ctx, Users, channel) {
  const addChannel = new Users({
    id: channel.id,
    bot: String(ctx.update.message.from.id),
    username: channel.username,
    title: channel.title,
    invite_link: ctx.me.first_name,
    photo: channel.photo.big_file_id,
  });
  return addChannel;
}

export async function editChannelInDataBase(ctx, Users, channelName, newСhannelName) {
  const editChannel = await Users.findOneAndUpdate(
    { title: channelName },
    {
      // id: channel.id,
      // bot: String(ctx.update.message.from.id),
      // username: channel.username,
      title: newСhannelName,
      // invite_link: ctx.me.first_name,
      // photo: channel.photo.big_file_id,
      upsert: true,
      useFindAndModify: false,
    }
  );
  return editChannel;
}

export async function showAllUserChannelsFromDataBase(ctx, Users) {
  const showAllChannels = await Users.find({ bot: ctx.update.callback_query.from.id });
  return showAllChannels.join(' ');
}

export async function deleteChannelFromDataBase(ctx, Users, text) {
  const deleteChannel = await Users.deleteOne({ title: text });
  return deleteChannel;
}

export default {
  checkTelegramAnswer,
  saveUserToDataBase,
  saveBotToDataBase,
  editBotInDataBase,
  showAllUserBotsFromDataBase,
  deleteBotFromDataBase,
  saveChannelToDataBase,
  editChannelInDataBase,
  showAllUserChannelsFromDataBase,
  deleteChannelFromDataBase,
};
