export default {
  addSymbol: symbol => {
    return {
      cmd: 'SADD',
      args: ['symbols', symbol]
    };
  },
  getConfig: () => {
    return [
      {cmd: 'SMEMBERS', args: ['symbols'], key: 'symbols'},
      {cmd: 'HGETALL', args: ['browser'], key: 'browser'}
    ];
  },
  getSymbols: () => {
    return {
      cmd: 'SMEMBERS',
      args: ['symbols']
    };
  },
  getBrowser: () => {
    return {
      cmd: 'HGETALL',
      args: ['browser']
    };
  },
  removeSymbol: symbol => {
    return {
      cmd: 'SREM',
      args: ['symbols', symbol]
    };
  },
  setBrowser: fields => {
    var arr = ['browser'];
    for (var key in fields) {
      arr.push(key, fields[key]);
    }
    return {
      cmd: 'HSET',
      args: arr
    };
  }
};
