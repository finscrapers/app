module.exports.Types = {
  string: value => {
    return String(value);
  },
  number: value => {
    return Number(value);
  },
  array: value => {
    return Array(value)[0];
  }
};

module.exports.validate = (data, model) => {
  var obj = {};
  for (var prop in model) {
    let value = data[prop];
    let validator = model[prop];
    obj[prop] = validator(value);
  }
  return obj;
};
