const responseUtil = require('../modules/serviceModels/ResponseUtil');

describe('AuthToken', () => {
  test('Basic Create Base Reponse', async () => {
    responseUtil.CreateBaseReponse(true, '', 'redirect');
  });

  test('Basic Create Data Reponse', async () => {
    responseUtil.CreateDataReponse(true, '', 'redirect', 'data');
  });
});
