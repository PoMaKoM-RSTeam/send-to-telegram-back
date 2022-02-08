import { cleanEnv, str, num } from 'envalid';

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'] }),
  LOG_LEVEL: str({
    devDefault: 'trace',
    default: 'info',
    choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'],
  }),
  DATABASE_URL: str({ devDefault: 'mongodb+srv://Admin:vZ7vg35CC34dVFZ@users.d1obt.mongodb.net/Users' }),
  SERVER_PORT: num({
    default: 5050,
  }),
  BOT_SERVER_HOST: str({
    default: '0.0.0.0',
  }),
  BOT_SERVER_PORT: num({
    default: 7070,
  }),
  BOT_TOKEN: str({ devDefault: '5034764553:AAHkUrvWNHyYZPokRqmdaRSQ7Q5mIe70x9o' }),
  BOT_WEBHOOK: str({ default: '' }),
  BOT_ADMIN_USER_ID: num({ default: 720675321 }),
});
