import crypto from 'crypto';
import models from '../models/models';
import config from '../config/config';
import ApiError from '../apiError/apiError';

class userService {
  static async registrateUser(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    authDate: Date,
    hash: string
  ) {
    if (!this.checkUserData(id, firstName, username, authDate, hash)) {
      throw ApiError.badRequest("Incorrect user's data");
    }
    const user = await models.userModel.findOne({ id });
    if (user) throw ApiError.badRequest('User is already exists');
    await models.userModel.create({
      id,
      first_name: firstName,
      last_name: lastName,
      username,
      auth_date: authDate,
      hash,
    });
    return { message: 'User created successfully' };
  }

  static checkUserData(id: number, firstName: string, username: string, authDate: Date, hash: string) {
    const secret = crypto.createHash('sha256').update(config.TOKEN).digest();
    const checkString = `auth_date=${authDate}\nfirst_name=${firstName}\nid=${id}\nusername=${username}`;
    const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
    return hmac === hash;
  }
}
export default userService;
