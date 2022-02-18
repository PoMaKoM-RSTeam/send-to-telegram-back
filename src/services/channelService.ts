import { Chat, ChatMemberAdministrator, Update } from 'grammy/out/platform.node';
import ApiError from '../apiError/apiError';
import { bot } from '../bot';
import models from '../models/models';
import RoleService from './roleService';
import userService from './userService';

class ChannelService {
  static async findChannel(channelId: number | string) {
    let channel;
    if (typeof channelId === 'number') {
      channel = await models.channelModel.findOne({ id: channelId });
    } else if (typeof channelId === 'string') {
      channel = await models.channelModel.findById(channelId);
    }
    return channel;
  }

  static async addChannel(updateObj: Update): Promise<void> {
    const channelOwner = await userService.findUser(updateObj.my_chat_member.from.id);
    const addedBot = updateObj.my_chat_member.new_chat_member as ChatMemberAdministrator;
    const channelInfo = (await bot.api.getChat(updateObj.my_chat_member.chat.id)) as Chat.SupergroupGetChat;
    const botInfo = await bot.api.getMe();
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
      ChannelBot.leaveChannel(channelInfo.id);
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
      await channel.updateOne(channelObjRecord);
      channel = await this.findChannel(channelInfo.id);
    } else {
      channel = await models.channelModel.create({ id: channelInfo.id, ...channelObjRecord });
    }
    await RoleService.createBaseRoles();
    const role = await RoleService.findRole('name', 'administrator');
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
    console.log(channel);
    if (!userChannelRole) {
      console.log('new record');
      await models.usersChannelsRolesModel.create({
        userId: channelOwner._id,
        roleId: role._id,
        channelId: channel._id,
      });
    }
    console.log('Channel created successfully');
    // const response = { message: 'Channel created successfully' };
  }

  static async addChannelMember(
    userId: number,
    channelId: number,
    newMemberId: number,
    roleId: string
  ): Promise<{ message: string }> {
    const user = await userService.findUser(userId);
    if (!user) {
      throw ApiError.unauthorized('User is not registered yet');
    }
    const channel = await this.findChannel(channelId);
    if (!channel) {
      throw ApiError.badRequest('User you try to add to the channel is not registered yet');
    }
    const userChannelRole = await models.usersChannelsRolesModel.findOne({
      userId: user._id,
      channelId: channel._id,
    });
    if (!userChannelRole) {
      throw ApiError.forbidden('Your user have no access to this channel');
    }
    const userRole = await RoleService.findRole('_id', `${userChannelRole.roleId}`);
    if (!userRole.can_give_channel_access) {
      throw ApiError.forbidden('Your user have no permission to share access to this channel');
    }

    const newMember = await userService.findUser(newMemberId);
    if (!newMember) {
      throw ApiError.badRequest('User you try to add to the channel is not registered yet');
    }
    const newMemberRole = await RoleService.findRole('_id', roleId);
    if (!newMemberRole) {
      throw ApiError.badRequest('Role you try to share with user does not exist');
    }
    const newMemberChannelRecord = await models.usersChannelsRolesModel.findOne({
      channelId: channel._id,
      userId: newMember._id,
    });
    if (!newMemberChannelRecord) {
      await models.usersChannelsRolesModel.create({
        channelId: channel._id,
        roleId: newMemberRole._id,
        userId: newMember._id,
      });
      return { message: `New member added to channel ${channel.title} successfully` };
    }
    newMemberChannelRecord.update({
      roleId: newMemberRole._id,
    });
    return { message: `Member with role ${newMemberRole} added to channel ${channel.title} successfully` };
  }

  static async editChannelMember(
    userId: number,
    channelId: number,
    newMemberId: number,
    roleId: string
  ): Promise<{ message: string }> {
    const user = await userService.findUser(userId);
    if (!user) {
      throw ApiError.unauthorized('User is not registered yet');
    }
    const channel = await this.findChannel(channelId);
    if (!channel) {
      throw ApiError.badRequest('User you try to edit the role in the channel is not registered yet');
    }
    const userChannelRole = await models.usersChannelsRolesModel.findOne({
      userId: user._id,
      channelId: channel._id,
    });
    if (!userChannelRole) {
      throw ApiError.forbidden('Your user have no access to this channel');
    }
    const userRole = await RoleService.findRole('_id', `${userChannelRole.roleId}`);
    if (!userRole.can_edit_channel_member) {
      throw ApiError.forbidden('Your user have no permission to edit members from this channel');
    }
    const newMember = await userService.findUser(newMemberId);
    if (!newMember) {
      throw ApiError.badRequest('User you try to edit is not registered yet');
    }
    const newMemberRole = await RoleService.findRole('_id', roleId);
    if (!newMemberRole) {
      throw ApiError.badRequest('Role you try to share with user does not exist');
    }
    await models.usersChannelsRolesModel.updateOne({
      channelId: channel._id,
      roleId: newMemberRole._id,
      userId: newMember._id,
    });
    return {
      message: `The role "${newMemberRole.name}" 
      added to the user ${newMember.username} 
      in the channel ${channel.username}`,
    };
  }

  static async deleteChannelMember(
    userId: number,
    channelId: number,
    newMemberId: number,
    roleId: string
  ): Promise<{ message: string }> {
    const user = await userService.findUser(userId);
    if (!user) {
      throw ApiError.unauthorized('User is not registered yet');
    }
    const channel = await this.findChannel(channelId);
    if (!channel) {
      throw ApiError.badRequest('User you try to remove from the channel is not registered yet');
    }
    const userChannelRole = await models.usersChannelsRolesModel.findOne({
      userId: user._id,
      channelId: channel._id,
    });
    if (!userChannelRole) {
      throw ApiError.forbidden('Your user have no access to this channel');
    }
    const userRole = await RoleService.findRole('_id', `${userChannelRole.roleId}`);
    if (!userRole.can_delete_channel_member) {
      throw ApiError.forbidden('Your user have no permission to delete members from this channel');
    }
    const newMember = await userService.findUser(newMemberId);
    if (!newMember) {
      throw ApiError.badRequest('User you try to add to the channel is not registered yet');
    }
    const newMemberRole = await RoleService.findRole('_id', roleId);
    if (!newMemberRole) {
      throw ApiError.badRequest('Role you try to share with user does not exist');
    }
    await models.usersChannelsRolesModel.deleteOne({
      channelId: channel._id,
      userId: newMember._id,
    });
    return { message: `Member with role ${newMemberRole} removed from the channel ${channel.title} successfully` };
  }

  static async getMemberChannels(userId: number) {
    const user = await userService.findUser(userId);
    if (!user) {
      throw ApiError.badRequest('Such user does not exists');
    }
    const userChannelConnections = await models.usersChannelsRolesModel.find({ userId: user._id });
    const channels = await Promise.all(
      userChannelConnections.map(async (channelConnection) => {
        const channel = await this.findChannel(`${channelConnection.channelId}`);
        return channel;
      })
    );
    return channels;
  }

  static async deleteChannel(channelId: number): Promise<void> {
    const channel = await this.findChannel(channelId);
    if (!channel) {
      return;
    }
    await models.usersChannelsRolesModel.deleteMany({
      channelId: channel._id,
    });
    await channel.delete();
    console.log('Channel deleted succesfully');
  }

  static async deleteChannelDirectly(channelId: number, userId: number): Promise<{ message: string }> {
    const channel = await this.findChannel(channelId);
    if (!channel) {
      throw ApiError.badRequest('There is no such channel');
    }
    const user = await userService.findUser(userId);
    if (!user) {
      throw ApiError.badRequest('User arent registered yet');
    }
    const userChannelRole = await models.usersChannelsRolesModel.findOne({
      userId: user._id,
      channelId: channel._id,
    });
    if (!userChannelRole) {
      throw ApiError.forbidden('This user have no access to manage with this channel');
    }
    const userRole = await RoleService.findRole('_id', `${userChannelRole.roleId}`);
    if (!userRole.can_delete_channel) {
      throw ApiError.forbidden('This user have no access to delete this channel');
    }
    await bot.api.leaveChat(channelId);
    await this.deleteChannel(channelId);
    return { message: 'Channel deleted directly by user' };
  }
}

export default ChannelService;
