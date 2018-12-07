// Request to FilesApi module

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

/**
 * Gather all the documents that the user authored
 *
 * @param {req} req
 * @param {Object} info
 */
module.exports.getFilesForAuthor = (req, info) => new Promise((resolve, reject) => {
  req.body.username = info.username;
  chai.request('http://localhost:8080')
    .post('/GatewayApi/files/getDoc')
    .send(
      req.body,
      { headers: req.headers },
    )
    .then((responseFromMicro) => {
      // Construct success reponse
      resolve(responseFromMicro.body.content.body);
    })
    // Consruct failed reponse
    .catch(err => reject(err));
});
