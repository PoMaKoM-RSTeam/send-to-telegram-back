import models from '../models/models';

class RoleService {
  static async findRole(paramForFind: string, value: string) {
    const role = await models.roleModel.findOne({ [paramForFind]: value });
    return role;
  }

  static async createRole(
    roleName: string,
    canChangeinfo: boolean,
    canPostMessages: boolean,
    canEditMessages: boolean,
    canDeleteMessages: boolean,
    canGiveChannelAccess: boolean,
    canDeleteChannelMember: boolean,
    canEditChannelMember: boolean,
    canDeleteChannel: boolean
  ) {
    await models.roleModel.create({
      name: roleName,
      can_change_info: canChangeinfo,
      can_post_messages: canPostMessages,
      can_edit_messages: canEditMessages,
      can_delete_messages: canDeleteMessages,
      can_give_channel_access: canGiveChannelAccess,
      can_delete_channel_member: canDeleteChannelMember,
      can_edit_channel_member: canEditChannelMember,
      can_delete_channel: canDeleteChannel,
    });
  }

  static async createBaseRoles() {
    const adminRole = await this.findRole('name', 'administrator');
    if (!adminRole) {
      this.createRole('administrator', true, true, true, true, true, true, true, true);
    } else {
      await adminRole.updateOne({
        can_change_info: true,
        can_post_messages: true,
        can_edit_messages: true,
        can_delete_messages: true,
        can_give_channel_access: true,
        can_delete_channel_member: true,
        can_edit_channel_member: true,
        can_delete_channel: true,
      });
    }
  }
}
export default RoleService;
