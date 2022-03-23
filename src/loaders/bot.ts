import { Application, Router } from 'express';
import { webhookCallback } from 'grammy';
import { bot } from '../bot';
import { logger } from '../bot/logger';
import { config } from '../config/config';

export default async ({ app }: { app: Application }) => {
  if (config.isProd) {
    const botRouter = Router();
    app.use('/bot', botRouter);
    botRouter.use(webhookCallback(bot, 'express'));
    bot.api
      .setWebhook(config.BOT_WEBHOOK)
      .then((tex) => {
        console.log('ВХ УСТАНОВИЛСЯ', tex);
      })
      .catch((err) => logger.error(err));

    // bot.start({
    //   onStart: ({ username }) => logger.info(`🤖 Bot running on webhook as ${username}`),
    // });
  }

  if (!config.isProd) {
    await bot.start({
      onStart: ({ username }) => logger.info(`🤖 Bot running as ${username}`),
    });
  }
};
