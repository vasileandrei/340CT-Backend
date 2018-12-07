/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */

const mocks = require('../mocks/tokenMiddleware');

const req = {
  headers: {
    authorization: 'Bearer testToken',
  },
};

// let userInfo = {
//   hashToken: 'hashTokenTest',
//   role: config.accessLevels.admin,
// };
const adminSign = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJoYXNoVG9rZW4iOiJoYXNoVG9rZW5UZXN0Iiwicm9sZSI6NH0sImlhdCI6MTU0MjU1MTk5M30.v04XA6bVPRWhSe4c-0x0WcsaIGjQa42zrRjQp7uM33o';

// let userInfo = {
//   hashToken: 'hashTokenTest',
//   role: config.accessLevels.user,
// };
const userSign = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJoYXNoVG9rZW4iOiJoYXNoVG9rZW5UZXN0Iiwicm9sZSI6Nn0sImlhdCI6MTU0MjU1MTk5M30.RzuAB1vCHk9u1YkzXwcQjSoG9G8SsGYuzsjrVP0dcYI';

describe('checkAdminRole', () => {
  test('Successful check admin role from header', async () => {
    expect.assertions(2);
    try {
      req.headers.authorization = `Bearer ${adminSign}`;
      const res = mocks.checkAdminRole(req);
      expect(res).toBeTruthy();
      expect(res).toBe(true);
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });

  test('Fail to check user role from header', async () => {
    expect.assertions(2);
    try {
      req.headers.authorization = `Bearer ${userSign}`;
      const res = mocks.checkAdminRole(req);
      expect(res).toBeFalsy();
      expect(res).toBe(false);
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });

  test('Fail to check user role from header', async () => {
    expect.assertions(2);
    try {
      req.headers.authorization = undefined;
      const res = mocks.checkAdminRole(req);
      expect(res).toBeFalsy();
      expect(res).toBe(false);
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });
});

describe('AuthToken ', () => {
  test('Successful token from header (Bearer <key>)', async () => {
    expect.assertions(2);
    try {
      req.headers.authorization = `Bearer ${userSign}`;
      const res = mocks.AuthToken(req);
      expect(res).toBeTruthy();
      expect(res).toBe(true);
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });

  test('Unsuccessful token from header (Bearer)', async () => {
    expect.assertions(2);
    try {
      req.headers.authorization = 'Bearer';
      const res = mocks.AuthToken(req);
      expect(res).toBeFalsy();
      expect(res).toBe(false);
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });

  test('Unsuccessful token from empty header ()', async () => {
    expect.assertions(2);
    try {
      req.headers.authorization = '';
      const res = mocks.AuthToken(req);
      expect(res).toBeFalsy();
      expect(res).toBe(false);
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });

  test('Unsuccessful token from undefined header', async () => {
    expect.assertions(2);
    try {
      req.headers.authorization = undefined;
      const res = mocks.AuthToken(req);
      expect(res).toBeFalsy();
      expect(res).toBe(false);
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });
});

describe('checkSignature ', () => {
  test('Successful check signaure', async () => {
    expect.assertions(2);
    try {
      const res = mocks.checkSignature(adminSign);
      expect(res).toBeTruthy();
      expect(res).toBe(true);
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });

  test('Unsuccessful check signaure', async () => {
    expect.assertions(2);
    try {
      const res = mocks.checkSignature(`${adminSign}123`);
      expect(res).toBeFalsy();
      expect(res).toBe(false);
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });
});
