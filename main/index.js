const {app, BrowserWindow} = require('electron');
const prepareRenderer = require('electron-next');
const path = require('path');
//const rootPath = path.join(__dirname, '..', '..');
//const {resolve: resolvePath} = require('app-root-path');
const isDev = require('electron-is-dev');
const {ipcMain} = require('electron');
const redis = require('redis').createClient();
const bots = require('bots');
const elasticsearch = require('elasticsearch');
const Types = require('../lib/models').Types;
const validate = require('../lib/models').validate;
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

ipcMain.on('redis-r', (event, queries) => {
  if (!Array.isArray(queries)) queries = [queries];
  queries.map(query => {
    redis.send_command(query.cmd, query.args, (err, res) => {
      if (err) return;
      let data = {};
      if (query.key) {
        data[query.key] = res;
      } else {
        data = res;
      }
      event.sender.send('redis-r', data);
    });
  });
});

ipcMain.on('redis-cud', (event, arg) => {
  redis.send_command(arg.cmd, arg.args, () => {
    event.sender.send('redis-cud', 1);
  });
});

ipcMain.on('bot-start', async (event, arg) => {
  const status = msg => {
    event.sender.send('bot-status', msg);
  };
  await bots[arg.bot](arg.args, status);
  event.sender.send('bot-end');
});

ipcMain.on('elasticsearch-start', async (event, arg) => {
  let model = {
    '1y Target Est': Types.string,
    '52 Week Range': Types.string,
    Ask: Types.string,
    'Avg. Volume': Types.string,
    'Beta (3Y Monthly)': Types.string,
    Bid: Types.string,
    'EPS (TTM)': Types.string,
    'Earnings Date': Types.string,
    'Ex-Dividend Date': Types.string,
    'Forward Dividend & Yield': Types.string,
    'Market Cap': Types.string,
    Open: Types.string,
    'PE Ratio (TTM)': Types.string,
    'Previous Close': Types.string,
    Prices: Types.array,
    Symbol: Types.string,
    Volume: Types.string
  };
  const toOperations = (meta, source, model) => {
    let ops = [];
    source.map(row => {
      ops.push(
        {index: {_index: meta.index, _type: meta.type, _id: row.Symbol}},
        validate({...row}, model)
      );
    });
    return ops;
  };
  await client.bulk({
    body: toOperations(arg.meta, arg.data, model)
  });
  event.sender.send('elasticsearch-end');
});

/*
if (isDev) {
  require('electron-reload')(__dirname, {
    //require('electron-reload')(resolvePath, {
    //electron: path.join(resolvePath, 'node_modules', '.bin', 'electron')
    electron: resolvePath('node_modules/.bin/electron')
  });
}
*/

let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});
  const devPath = 'http://localhost:8000/';
  //const prodPath = path.join(resolvePath, 'renderer/out/index.html');
  // const prodPath = path.join(__dirname, './renderer');
  const prodPath = path.resolve('/renderer/out/start/index.html');
  const entry = isDev ? devPath : 'file://' + prodPath;
  win.loadURL(entry);
  //if (isDev) win.webContents.openDevTools();
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', async () => {
  if (isDev) await prepareRenderer('./renderer');
  createWindow();
});

app.on('window-all-closed', () => {
  redis.quit();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
