import { cleanEnv, str, num } from 'envalid';

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'], default: 'production' }),
  LOG_LEVEL: str({
    devDefault: 'trace',
    default: 'info',
    choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'],
  }),
  DATABASE_URL: str({ default: 'mongodb+srv://Admin:vZ7vg35CC34dVFZ@users.d1obt.mongodb.net/Users' }),
  PORT: num({
    default: 8443,
  }),
  BOT_SERVER_HOST: str({
    default: '0.0.0.0',
  }),
  BOT_TOKEN: str({
    default: '5013607802:AAGi1irAzJAJlwU-3FvDkYtyxYr3EmFvbjs',
    devDefault: '5034764553:AAHkUrvWNHyYZPokRqmdaRSQ7Q5mIe70x9o',
  }),
  BOT_WEBHOOK: str({ default: 'https://send-to-telegram-back.herokuapp.com/bot/' }),
  BOT_ADMIN_USER_ID: num({ default: 720675321 }),
});
