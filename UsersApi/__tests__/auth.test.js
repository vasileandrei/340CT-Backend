
const auth = require('./../modules/auth');

const userInfo = {
  hashkey: 'testHashkey',
  permission: 'user',
  username: 'test',
};

const files = [];

describe('jwtSign', () => {
  test('Create truthy jwt token', async () => {
    expect.assertions(1);
    const jwtRes = await auth.jwtSign(userInfo, files);
    expect(jwtRes).toBeTruthy();
  });

  test('Create truthy jwt token with unusual input', async () => {
    expect.assertions(1);
    const jwtRes = await auth.jwtSign(userInfo, undefined);
    expect(jwtRes).toBeTruthy();
  });
});
