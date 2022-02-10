import bot from '../components/botMenu/index';

export default async function startup() {
  await bot.start({
    onStart: (botInfo) => {
      console.log(new Date(), 'Bot starts as', botInfo.username);
    },
  });
}
