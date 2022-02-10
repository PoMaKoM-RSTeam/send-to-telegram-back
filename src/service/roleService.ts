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
    canDeleteMessages: boolean
  ) {
    await models.roleModel.create({
      name: roleName,
      can_change_info: canChangeinfo,
      can_post_messages: canPostMessages,
      can_edit_messages: canEditMessages,
      can_delete_messages: canDeleteMessages,
    });
  }

  static async createBaseRoles() {
    const adminRole = await this.findRole('name', 'administrator');
    if (!adminRole) {
      this.createRole('administrator', true, true, true, true);
    } else {
      await adminRole.updateOne({
        can_change_info: true,
        can_post_messages: true,
        can_edit_messages: true,
        can_delete_messages: true,
      });
    }
  }
}
export default RoleService;
