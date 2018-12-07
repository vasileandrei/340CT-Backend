
const util = require('./../modules/util');

// Integration Testin util module

describe('checkField', () => {
  test('Succesffuly checkField test empty field', async () => {
    try {
      expect.assertions(1);
      const myField = 'tableName';
      const myFieldValue = '';
      const myBool = false;
      const res = '';
      util.checkField(myField, myFieldValue, myBool, res);
    } catch (err) {
      expect(err.message).toEqual('res.send is not a function');
    }
  });

  test('Unsuccesffuly checkField actual empty field', async () => {
    try {
      expect.assertions(1);
      const myField = 'tableName';
      const myFieldValue = '';
      const myBool = true;
      const res = '';
      util.checkField(myField, myFieldValue, myBool, res);
    } catch (err) {
      expect(err.message).toEqual('res.send is not a function');
    }
  });

  test('Succesffuly checkField test not-empty field', async () => {
    expect.assertions(1);
    const myField = 'tableName';
    const myFieldValue = 'notEmpty';
    const myBool = false;
    const res = '';
    util.checkField(myField, myFieldValue, myBool, res);
    const check = 'If you got this far, that is good';
    expect(check).toEqual('If you got this far, that is good');
  });
});
