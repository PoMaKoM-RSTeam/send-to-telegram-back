// export const keyboard = new Menu<Context>('language');

// for (let index = 1; index <= locales.length; index += 1) {
//   const code = locales[index - 1];

//   keyboard.text(
//     {
//       text: (ctx) => {
//         const isActivated = (ctx.session?.languageCode || ctx.from?.language_code) === code;

//         return `${isActivated ? '✅ ' : ''}${ISO6391.getNativeName(code)}`;
//       },
//       payload: code,
//     },
//     async (ctx) => {
//       const newLanguageCode = ctx.match;

//       logger.info({
//         msg: 'handle language selection',
//         code: newLanguageCode,
//         ...getMetadata(ctx),
//       });

//       if (locales.includes(newLanguageCode)) {
//         await usersService.updateByTelegramId(ctx.from.id, {
//           languageCode: newLanguageCode,
//         });
//         ctx.session.languageCode = newLanguageCode;

//         await ctx.fluent.renegotiateLocale();

//         await ctx.editMessageText(ctx.t('language_changed'), {
//           reply_markup: keyboard,
//         });
//       }
//     }
//   );

//   if (index % 2 === 0) {
//     keyboard.row();
//   }
// }
