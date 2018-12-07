/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
const util = require('./../modules/util');

const userInfo = {
  hashkey: 'testHashkey',
  permission: 'user',
  username: 'test',
  files: [],
};

describe('checkErrWithReturn', () => {
  test('Succesffuly checkErrorWithReturn no err', async () => {
    expect.assertions(1);
    const myField = '';
    const myBool = true;
    const response = util.checkErrorWithReturn(myField, myBool);
    expect(response).toBe(false);
  });

  test('Succesffuly checkErrorWithReturn test err', async () => {
    expect.assertions(1);
    const myField = new Error('Some Error');
    const myBool = true;
    const response = util.checkErrorWithReturn(myField, myBool);
    expect(response).toBe(true);
  });

  test('Succesffuly checkErrorWithReturn actual err', async () => {
    expect.assertions(1);
    const myField = new Error('SERIOUS TEST Error Something to print here');
    const myBool = false;
    const response = util.checkErrorWithReturn(myField, myBool);
    expect(response).toBe(false);
  });
});

describe('checkErr ', () => {
  test('Succesffuly checkErr no err', async () => {
    const myField = '';
    const myBool = true;
    util.checkErrorWithReturn(myField, myBool);
  });

  test('Succesffuly checkErr test err', async () => {
    const myField = new Error('Some Error');
    const myBool = true;
    util.checkError(myField, myBool);
  });

  test('Succesffuly checkErr actual err', async () => {
    const myField = new Error('SERIOUS TEST Error Something to print here');
    const myBool = false;
    util.checkError(myField, myBool);
  });
});

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
    const response = util.checkField(myField, myFieldValue, myBool, res);
    expect(response).toBe(true);
  });
});

describe('getConfig', () => {
  test('Succesffuly getConfig', async () => {
    expect.assertions(1);
    const myField = 'user';
    const resp = util.getConfig(myField);
    expect(resp).toBe(6);
  });

  test('Succesffuly getConfig', async () => {
    expect.assertions(1);
    const myField = 'admin';
    const resp = util.getConfig(myField);
    expect(resp).toBe(4);
  });
});

describe('simpleTokenSign', () => {
  test('Successfully sign token', async () => {
    expect.assertions(1);
    const jwtRes = await util.simpleTokenSign(userInfo);
    expect(jwtRes).toBeTruthy();
  });

  test('Failing sign token with usual input', async () => {
    try {
      expect.assertions(1);
      const test = await util.simpleTokenSign(undefined);
      console.log(`${test} will not be called either way`);
    } catch (err) {
      expect(err.message).toEqual('Cannot read property \'userInfo\' of undefined');
    }
  });
});

describe('simpleTokenDecode ', () => {
  test('Successfully decode token', async () => {
    expect.assertions(1);
    const customObject = {
      test: 'test',
    };
    const customToken = await util.simpleTokenSign(customObject);
    const jwtRes = await util.simpleTokenDecode(customToken);
    expect(jwtRes).toBeTruthy();
  });
});
