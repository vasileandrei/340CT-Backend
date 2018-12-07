/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */

const sql = require('../modules/sqlUsers');

const reqBody = {
  email: 'testEmail',
  username: 'testUsername',
  password: 'testPassword',
};

const tableName = 'usersTest';

describe('addUser', () => {
  test('Succesffuly adding a user', async (done) => {
    expect.assertions(1);
    try {
      sql.addUser(tableName, reqBody, (data) => {
        expect(data).toBeNull();
        done();
      });
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });

  test('Failing to adding a user', async (done) => {
    expect.assertions(1);
    try {
      sql.addUser(tableName, reqBody, (data) => {
        expect(data).toEqual('SQLITE_CONSTRAINT: UNIQUE constraint failed: usersTest.username');
        done();
      });
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });
});

describe('getFromDb', () => {
  test('Succesffuly getting a user from the table', async (done) => {
    expect.assertions(2);
    reqBody.username = 'testUsername';
    const outcome = await sql.getFromDb(tableName, reqBody);
    expect(outcome).not.toBeNull();
    expect(outcome).toBeTruthy();
    done();
  });

  test('Failing to delete an unexisting entry', async (done) => {
    expect.assertions(1);
    reqBody.username = 'testUsername';
    reqBody.username += '123';
    const outcome = await sql.getFromDb(tableName, reqBody);
    expect(outcome).toBe(undefined);
    done();
  });
});

describe('deleteUser', () => {
  test('Succesffuly deleting a user', async (done) => {
    expect.assertions(1);
    reqBody.username = 'testUsername';
    try {
      sql.deleteUser(tableName, reqBody, (data) => {
        expect(data).toBeNull();
        done();
      });
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });
});
