import electron from 'electron';
import Api from './api';
const ipcRenderer = electron.ipcRenderer || false;

const mutate = (method, arg, model) => {
  return new Promise((resolve, reject) => {
    if (model) {
      try {
        transform(Object.assign({}, arg), model);
      } catch (e) {
        return reject(e.toString());
      }
    }
    ipcRenderer.send('redis-cud', Api[method](arg));
    resolve();
  });
};
const subscribe = (getter, setter, model) => {
  ipcRenderer.on('redis-r', (event, data) => {
    if (!data) throw new Error('No data retrieved from database.');
    setter(transform(data, model));
  });
  ipcRenderer.on('redis-cud', () => {
    ipcRenderer.send('redis-r', Api[getter]());
  });
  ipcRenderer.send('redis-r', Api[getter]());
  return () => {
    ipcRenderer.removeAllListeners('redis-r');
    ipcRenderer.removeAllListeners('redis-cud');
  };
};

const transform = (obj, model) => {
  if (!model) return obj;
  for (var prop in obj) {
    switch (model[prop]) {
      case 'INT':
        var num = Number(obj[prop]);
        if (isNaN(num)) throw new TypeError(obj[prop] + ' is NaN.');
        obj[prop] = num;
        break;
      case 'BOOLEAN':
        obj[prop] = obj[prop] === 'true';
    }
  }
  return obj;
};
const assign = (target, setter) => {
  return source => {
    setter(Object.assign(target, source));
  };
};

export {mutate, subscribe, assign};
