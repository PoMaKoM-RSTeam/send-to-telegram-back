import { bot } from '../bot';
import { logger } from '../bot/logger';

export default async () => {
  // if (config.isProd) {
  // TODO: Написать вебхуки
  // server.listen(config.BOT_SERVER_PORT, config.BOT_SERVER_HOST, () => {
  //   bot.api
  //     .setWebhook(config.BOT_WEBHOOK, {
  //       allowed_updates: config.BOT_ALLOWED_UPDATES,
  //     })
  //     .catch((err) => logger.error(err));
  // });
  // } else {
  bot.start({
    onStart: ({ username }) => logger.info(`🤖 Bot running as ${username}`),
  });
  // }
};
