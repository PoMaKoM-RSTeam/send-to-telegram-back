import ApiError from '../apiError/apiError';
import models from '../models/models';

class RoleService {
  static async findRole(id: string) {
    const role = await models.roleModel.findById(id);
    if (!role) {
      throw ApiError.badRequest('Role with such id does not exist');
    }
    return role;
  }
}
export default RoleService;
