import { Update } from 'grammy/out/platform.node';
import bot from '.';

class ChannelBot {
  static async getChatInfo(updateObj: Update) {
    const chatInfo = await bot.api.getChat(updateObj.my_chat_member.chat.id);
    return chatInfo;
  }

  static async getBotInfo() {
    const botInfo = await bot.api.getMe();
    return botInfo;
  }
}

export default ChannelBot;
