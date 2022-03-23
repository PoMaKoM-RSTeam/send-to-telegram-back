export const getPrivateChatCommands = () => {
  const commands = [
    {
      command: 'start',
      description: 'Register oneself',
    },
    {
      command: 'menu',
      description: 'Display main menu',
    },
    {
      command: 'help',
      description: 'Display instructions for working with the bot',
    },
    {
      command: 'my_channels',
      description: 'Get control of my channels',
    },
  ];

  return commands;
};
