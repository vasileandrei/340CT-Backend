/* eslint-disable no-magic-numbers */

const hash = require('./../modules/hash');

const req = {
  headers: {
    authorization: 'Bearer testToken',
  },
  username: 'testUsername',
  password: 'testPassword',
};

describe('createHash', () => {
  test('Creating a hash Key', async () => {
    expect.assertions(1);
    req.username = 'testUsername';
    req.password = 'testPassword';
    const hashKey = await hash.createHash(req);
    expect(hashKey).toBeTruthy();
  });

  test('Using different case username', async () => {
    expect.assertions(3);
    req.username = 'testUsername';
    req.password = 'testPassword';
    const hashKey = await hash.createHash(req);
    req.username = req.username.toUpperCase();
    const upperHashKey = await hash.createHash(req);
    expect(hashKey).toBeTruthy();
    expect(upperHashKey).toBeTruthy();
    expect(hashKey).toEqual(upperHashKey);
  });

  test('Using different case password', async () => {
    expect.assertions(3);
    req.username = 'testUsername';
    req.password = 'testPassword';
    const hashKey = await hash.createHash(req);
    req.password = req.password.toUpperCase();
    const upperHashKey = await hash.createHash(req);
    expect(hashKey).toBeTruthy();
    expect(upperHashKey).toBeTruthy();
    expect(hashKey).not.toBe(upperHashKey);
  });

  test('Using differet characters in password', async () => {
    expect.assertions(1);
    req.username = 'testUsername';
    req.password = 'testPassworD123.__-';
    const hashKey = await hash.createHash(req);
    expect(hashKey).toBeTruthy();
  });
});

describe('compareHash', () => {
  test('Compare username and password to hash', async () => {
    expect.assertions(2);
    req.username = 'testUsername';
    req.password = 'testPassword';
    const myHash = await hash.createHash(req);
    const compareBool = await hash.compareHash(req, myHash);
    expect(compareBool).toBeTruthy();
    expect(compareBool).toBe(true);
  });

  test('Compare different case username', async () => {
    expect.assertions(2);
    req.username = 'testUsername';
    req.password = 'testPassword';
    const myHash = await hash.createHash(req);
    req.username = req.username.toUpperCase();
    const compareBool = await hash.compareHash(req, myHash);
    expect(compareBool).toBeTruthy();
    expect(compareBool).toBe(true);
  });

  test('Compare different case password', async () => {
    expect.assertions(2);
    req.username = 'testUsername';
    req.password = 'testPassword';
    const myHash = await hash.createHash(req);
    req.password = req.password.toUpperCase();
    const compareBool = await hash.compareHash(req, myHash);
    expect(compareBool).toBeFalsy();
    expect(compareBool).not.toBe(true);
  });
});
