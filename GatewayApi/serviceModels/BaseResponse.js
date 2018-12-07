
// Base reponse constructor
class BaseResponse {
  constructor() {
    this.hasBeenSuccessful = false;
    this.errors = '';
    this.redirect = '';
  }
}

module.exports = BaseResponse;
