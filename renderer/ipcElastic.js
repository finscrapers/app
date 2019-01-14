import electron from 'electron';
const ipcRenderer = electron.ipcRenderer || false;

const save = (data, index, status) => {
  ipcRenderer.on('elasticsearch-end', () => {
    status('Saved data');
    ipcRenderer.removeAllListeners('elasticsearch-start');
    ipcRenderer.removeAllListeners('elasticsearch-end');
  });
  ipcRenderer.send('elasticsearch-start', {
    meta: {index: 'symbols', type: '_doc'},
    data: data
  });
};

export {save};
