const validate = require('../app/lib/models').validate;
const Types = require('../app/lib/models').Types;

describe('models', () => {
  let data = {
    '1y Target Est': '171.78',
    '52 Week Range': '1.96',
    Ask: '22'
  };

  let model = {
    '1y Target Est': Types.number,
    '52 Week Range': Types.number
  };
  let expected = {
    '1y Target Est': 171.78,
    '52 Week Range': 1.96
  };

  it('transforms from string object to a model', () => {
    let res = validate(data, model);
    expect(res).toEqual(expect.objectContaining(expected));
  });
});
