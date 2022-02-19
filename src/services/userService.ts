/* eslint-disable camelcase */
import { TelegramLogin, TelegramLoginPayload } from 'node-telegram-login';
import models from '../models/models';
import { config } from '../config/config';
import ApiError from '../apiError/apiError';
import RoleService from './roleService';

export default class userService {
  static async findUser(id: number) {
    const user = await models.userModel.findOne({ id });
    return user;
  }

  static async authUser(userObj: TelegramLoginPayload) {
    if (!this.checkUserData(userObj)) {
      throw ApiError.badRequest("Incorrect user's data");
    }

    const { id, first_name, username, auth_date, hash } = userObj;

    const user = await models.userModel.findOneAndUpdate({ id }, { first_name, username, hash });
    if (!user) {
      await models.userModel.create({
        id,
        first_name,
        username,
        auth_date,
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

  static checkUserData(userObj: TelegramLoginPayload) {
    if (!userObj.id || !userObj.first_name || !userObj.username || !userObj.auth_date || !userObj.hash) {
      throw ApiError.badRequest('User data is not full enough');
    }
    const MySiteLogin = new TelegramLogin(config.BOT_TOKEN);
    return !!MySiteLogin.checkLoginData(userObj);
  }
}
