import crypto from 'crypto';
import models from '../models/models';
import { config } from '../config/config';
import ApiError from '../apiError/apiError';
import RoleService from './roleService';

class userService {
  static async findUser(id: number) {
    const user = await models.userModel.findOne({ id });
    return user;
  }

  static async authUser(id: number, firstName: string, username: string, authDate: Date, hash: string) {
    if (!this.checkUserData(id, firstName, username, authDate, hash)) {
      throw ApiError.badRequest("Incorrect user's data");
    }
    const user = await models.userModel.findOneAndUpdate({ id }, { firstName, username, hash });
    if (!user) {
      await models.userModel.create({
        id,
        first_name: firstName,
        username,
        auth_date: authDate,
        hash,
      });
    }
    return { message: 'User authentificate successfully' };
  }

  static async checkUserRole(id: number, role: string) {
    const user = await this.findUser(id);
    const userRole = await RoleService.findRole('id', user.id);
    if (userRole.name !== role) {
      throw ApiError.forbidden('Access denied');
    }
  }

  static checkUserData(id: number, firstName: string, username: string, authDate: Date, hash: string) {
    if (!id || !firstName || !username || !authDate || !hash) {
      throw ApiError.badRequest('User data is not full enough');
    }
    const secret = crypto.createHash('sha256').update(config.BOT_TOKEN).digest();
    const checkString = `auth_date=${authDate}\nfirst_name=${firstName}\nid=${id}\nusername=${username}`;
    const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
    return hmac === hash;
  }
}
export default userService;
