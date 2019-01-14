import electron from 'electron';
const ipcRenderer = electron.ipcRenderer || false;

const exec = (bot, args, status) => {
  ipcRenderer.on('bot-end', () => {
    ipcRenderer.removeAllListeners('start-bot');
    ipcRenderer.removeAllListeners('end-bot');
  });
  ipcRenderer.on('bot-status', (event, args) => {
    status(args);
  });
  ipcRenderer.send('bot-start', {bot: bot, args: args, status: status});
};

export {exec};
