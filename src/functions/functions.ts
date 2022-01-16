import crypto from 'crypto';
import TOKEN from '../index';

export function checkTelegramAnswer(req) {
  const secret = crypto.createHash('sha256').update(TOKEN).digest();
  const checkString = `auth_date=${req.query.auth_date}\nfirst_name=${req.query.first_name}\nid=${req.query.id}\nusername=${req.query.username}`;
  const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
  return hmac === req.query.hash;
}

export function saveUserToDataBase(req, Users) {
  const user = new Users({
    userid: req.query.id,
    first_name: req.query.first_name,
    username: req.query.username,
    auth_date: req.query.auth_date,
    hash: req.query.hash,
  });
  return user;
}

export default { checkTelegramAnswer, saveUserToDataBase };
