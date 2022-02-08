import { Api, TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions';
import input from 'input'; // npm i input

const storeSession = new StoreSession('my_session');
const client = new TelegramClient(storeSession, 19362301, '8487a4600e8781c79e72fe1626bfaf21', {
  connectionRetries: 5,
});

// const apiId = 19362301;
// const apiHash = '8487a4600e8781c79e72fe1626bfaf21';
export const start = async () => {
  console.log('Loading interactive example...');
  // const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
  await client.start({
    phoneNumber: async () => (await input.text('number ?')) as Promise<string>,
    password: async () => (await input.text('password?')) as Promise<string>,
    phoneCode: async () => (await input.text('Code ?')) as Promise<string>,
    onError: (err) => console.log(err),
  });
  console.log('You should now be connected.');
  console.log(client.session.save()); // Save this string to avoid logging in again
};

// async function run() {
//   const result = await client.invoke(
//     new Api.messages.GetMessagesViews({
//       peer: new Api.InputPeerChannel({}),
//       id: [1],
//       increment: new Api.Bool({}),
//     })
//   );
//   console.log(result); // prints the result
// }

export const getmes = async () => {
  await client.connect(); // This assumes you have already authenticated with .start()

  const result = await client.invoke(
    new Api.channels.GetMessages({
      channel: 'RSCloneDevTestChannel',
      id: [new Api.InputMessageID({ id: 1 })],
    })
  );
  console.log('1', result); // prints the result

  const result3 = await client.invoke(
    new Api.channels.GetChannels({
      id: ['RSCloneDevTestChannel'],
    })
  );
  console.log('3', result3); // prints the result

  // const result2 = await client.invoke(
  //   new Api.messages.GetHistory({
  //     peer: new Api.InputPeerChannel({
  //       accessHash: result3.chats[0].accessHash,
  //       channelId: result3.chats[0].id,
  //     }),
  //     limit: 100,
  //   })
  // );
  // console.log('2', result2); // prints the result

  // client.addEventHandler(('any')=> {

  // })

  // getParticipants(entity: EntityLike, params: chatMethods.IterParticipantsParams);
};
