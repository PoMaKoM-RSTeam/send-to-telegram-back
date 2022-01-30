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

export default { checkTelegramAnswer, saveUserToDataBase };
