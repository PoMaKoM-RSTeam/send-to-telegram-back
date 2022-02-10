import { Chat, ChatMemberAdministrator, Update } from 'grammy/out/platform.node';
import ApiError from '../apiError/apiError';
import ChannelBot from '../components/botMenu/channelBot';
import models from '../models/models';
import RoleService from './roleService';
import userService from './userService';

class ChannelService {
  static async findChannel(channelId: number) {
    const channel = await models.channelModel.findOne({ id: channelId });
    return channel;
  }

  static async addChannel(updateObj: Update): Promise<void> {
    const channelOwner = await userService.findUser(updateObj.my_chat_member.from.id);
    const addedBot = updateObj.my_chat_member.new_chat_member as ChatMemberAdministrator;
    const channelInfo = (await ChannelBot.getChatInfo(updateObj)) as Chat.SupergroupGetChat;
    const botInfo = await ChannelBot.getBotInfo();
    if (updateObj.my_chat_member.chat.type !== 'channel') {
      return;
    }
    if (addedBot.user.id !== botInfo.id) {
      throw ApiError.badRequest('Incorrect bot added');
    }
    if (
      (addedBot.status !== 'administrator' && !addedBot.can_manage_chat) ||
      !addedBot.can_change_info ||
      !addedBot.can_post_messages ||
      !addedBot.can_edit_messages ||
      !addedBot.can_delete_messages ||
      !addedBot.can_invite_users ||
      !addedBot.can_restrict_members ||
      !addedBot.can_promote_members ||
      !addedBot.can_manage_voice_chats
    ) {
      throw ApiError.badRequest('Bot must be a channel administrator and have all permissions');
    }
    if (!channelOwner) {
      throw ApiError.badRequest('Channel owner arent registered yet');
    }
    let channel = await this.findChannel(channelInfo.id);
    const channelObjRecord = {
      username: channelInfo.username || null,
      title: channelInfo.title || null,
      invite_link: channelInfo.invite_link || null,
      photo: channelInfo.photo || null,
    };
    if (channel) {
      channel = await channel.updateOne(channelObjRecord);
    } else {
      channel = await models.channelModel.create(channelObjRecord);
    }
    let role = await RoleService.findRole('name', 'administrator');
    if (!role) {
      await RoleService.createBaseRoles();
      role = await RoleService.findRole('name', 'administrator');
    }
    const userChannelRole = await models.usersChannelsRolesModel.findOneAndUpdate(
      {
        /* eslint no-underscore-dangle: 0 */
        userId: channelOwner._id,
        channelId: channel._id,
      },
      {
        roleId: role._id,
      }
    );
    if (!userChannelRole) {
      await models.usersChannelsRolesModel.create({
        userId: channelOwner._id,
        roleId: role._id,
        channelId: channel._id,
      });
    }
    console.log('Channel created successfully');
    // const response = { message: 'Channel created successfully' };
  }
}
export default ChannelService;
