/* eslint-disable no-magic-numbers */

const sql = require('../modules/sqlDatabase');

const newTableName = 'testName';

describe('createTable', () => {
  test('Succesffuly creating a table', async (done) => {
    expect.assertions(1);
    try {
      sql.createUserTable(newTableName, (data) => {
        expect(data).toBeNull();
        done();
      });
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });

  test('Creatig a table using a name already exitent', async (done) => {
    expect.assertions(2);
    try {
      sql.createUserTable(newTableName, (data) => {
        expect(data).not.toBeNull();
        expect(data).toBe('SQLITE_ERROR: table testName already exists');
        done();
      });
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });
});

describe('dropTable', () => {
  test('Succesffuly dropping a table', async (done) => {
    expect.assertions(1);
    sql.dropUserTable(newTableName, (data) => {
      expect(data).toBeNull();
      done();
    });
  });

  test('Deleting a non-existent table', async (done) => {
    expect.assertions(1);
    try {
      sql.dropUserTable(newTableName, (data) => {
        console.log(data);
        expect(data).toBe('SQLITE_ERROR: no such table: testName');
        done();
      });
    } catch (err) {
      console.log(`err is ${err.message}`);
    }
  });
});
