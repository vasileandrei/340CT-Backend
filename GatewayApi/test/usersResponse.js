/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-lines */

module.exports.usersBaseGet = {
  _eventsCount: 0,
  _maxListeners: undefined,
  body:
  {
    hasBeenSuccessful: true,
    errors: '',
    redirect: 'http://localhost:8081/api/v1/users/',
    content: {
      message: 'Hello from baseGet, UserController',
    },
  },
  files: undefined,
  buffered: true,
  header:
  {
    server: 'GatewayApi',
    'content-encoding': 'gzip',
    'content-type': 'application/json',
    date: 'Tue, 13 Nov 2018 23:34:24 GMT',
    connection: 'close',
    'transfer-encoding': 'chunked',
  },
  statusCode: 200,
  status: 200,
  statusType: 2,
  info: false,
  ok: true,
  redirect: false,
  clientError: false,
  serverError: false,
  error: false,
  created: false,
  accepted: false,
  noContent: false,
  badRequest: false,
  unauthorized: false,
  notAcceptable: false,
  forbidden: false,
  notFound: false,
};

module.exports.usersLoginPost = {
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  body: {
    hasBeenSuccessful: true,
    errors: '',
    redirect: 'http://localhost:8081/api/v1/users/login',
    content: {
      message: 'Successfuly generated Token',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoVG9rZW4iOiI1NjQ0N2ZmNWQ4NjJjNGFiYmQzZDNhZDc3ZGM1YjJjNzZlNmQyOWU5NWU4YzE3N2IzNTYxZjdkM2M4ZGZiZjNmIiwiaWF0IjoxNTQyMTQzNDM0LCJleHAiOjE1NDIxNDUyMzR9.XFncaoADuruUorJOllrjK7qe0iZaDSHPy17I7ZxAoK4',
    },
  },
  files: undefined,
  buffered: true,
  header: {
    server: 'GatewayApi',
    'content-encoding': 'gzip',
    'content-type': 'application/json',
    accepts: 'POST',
    date: 'Tue, 13 Nov 2018 19:06:19 GMT',
    connection: 'close',
    'transfer-encoding': 'chunked',
  },
  statusCode: 202,
  status: 202,
  statusType: 2,
  info: false,
  ok: true,
  redirect: false,
  clientError: false,
  serverError: false,
  error: false,
  created: true,
  accepted: false,
  noContent: false,
  badRequest: false,
  unauthorized: false,
  notAcceptable: false,
  forbidden: false,
};

module.exports.usersRegisterPost = {
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  body: {
    hasBeenSuccessful: true,
    errors: '',
    redirect: 'http://localhost:8081/api/v1/users/register',
    content: {
      message: 'User mochaTest successfully registered',
    },
  },
  files: undefined,
  buffered: true,
  header: {
    server: 'GatewayApi',
    'content-encoding': 'gzip',
    'content-type': 'application/json',
    accepts: 'DELETE',
    date: 'Tue, 13 Nov 2018 19:16:19 GMT',
    connection: 'close',
    'transfer-encoding': 'chunked',
  },
  statusCode: 201,
  status: 201,
  statusType: 2,
  info: false,
  ok: true,
  redirect: false,
  clientError: false,
  serverError: false,
  error: false,
  created: true,
  accepted: false,
  noContent: false,
  badRequest: false,
  unauthorized: false,
  notAcceptable: false,
  forbidden: false,
};

module.exports.usersCreateTablePost = {
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  body: {
    hasBeenSuccessful: true,
    errors: '',
    redirect: 'http://localhost:8081/api/v1/users/createTable',
    content: {
      message: 'Succesfully created table mochaTest',
    },
  },
  config: {
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    headers: {
      Accept: 'application/json, text/plain, */*',
      authorization: 'Bearer correctToken',
      'User-Agent': 'axios/0.18.0',
    },
    method: 'post',
    url: 'http://localhost:8080/GatewayApi/files/createTable',
    data: undefined,
  },
  files: undefined,
  buffered: true,
  header: {
    server: 'GatewayApi',
    'content-encoding': 'gzip',
    'content-type': 'application/json',
    accepts: 'POST',
    date: 'Tue, 13 Nov 2018 19:06:19 GMT',
    connection: 'close',
    'transfer-encoding': 'chunked',
  },
  statusCode: 201,
  status: 201,
  statusType: 2,
  info: false,
  ok: true,
  redirect: false,
  clientError: false,
  serverError: false,
  error: false,
  created: true,
  accepted: false,
  noContent: false,
  badRequest: false,
  unauthorized: false,
  notAcceptable: false,
  forbidden: false,
};

module.exports.forbiddenUsersCreateTablePost = {
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  body: {
    hasBeenSuccessful: false,
    errors: 'Not authorized. Token missing or wrong',
    redirect: 'http://localhost:8081/api/v1/users/createTable',
  },
  config: {
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    headers: {
      Accept: 'application/json, text/plain, */*',
      authorization: 'Bearer wrongToken',
      'User-Agent': 'axios/0.18.0',
    },
    method: 'post',
    url: 'http://localhost:8080/GatewayApi/files/createTable',
    data: undefined,
  },
  files: undefined,
  buffered: true,
  header: {
    server: 'GatewayApi',
    'content-encoding': 'gzip',
    'content-type': 'application/json',
    accepts: 'POST',
    date: 'Tue, 13 Nov 2018 19:06:19 GMT',
    connection: 'close',
    'transfer-encoding': 'chunked',
  },
  statusCode: 403,
  status: 403,
  statusType: 2,
  info: false,
  ok: true,
  redirect: false,
  clientError: false,
  serverError: false,
  error: false,
  created: true,
  accepted: false,
  noContent: false,
  badRequest: false,
  unauthorized: false,
  notAcceptable: false,
  forbidden: true,
};

module.exports.usersDropTableDelete = {
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  body: {
    hasBeenSuccessful: true,
    errors: '',
    redirect: 'http://localhost:8081/api/v1/users/dropTable',
    content: {
      message: '',
    },
  },
  config: {
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    headers: {
      Accept: 'application/json, text/plain, */*',
      authorization: 'Bearer correctToken',
      'User-Agent': 'axios/0.18.0',
    },
    method: 'delete',
    url: 'http://localhost:8080/GatewayApi/files/dropTable',
    data: undefined,
  },
  files: undefined,
  buffered: true,
  header: {
    server: 'GatewayApi',
    'content-encoding': 'gzip',
    'content-type': 'application/json',
    accepts: 'POST',
    date: 'Tue, 13 Nov 2018 19:06:19 GMT',
    connection: 'close',
    'transfer-encoding': 'chunked',
  },
  statusCode: 204,
  status: 204,
  statusType: 2,
  info: false,
  ok: true,
  redirect: false,
  clientError: false,
  serverError: false,
  error: false,
  created: true,
  accepted: false,
  noContent: false,
  badRequest: false,
  unauthorized: false,
  notAcceptable: false,
  forbidden: false,
};

module.exports.forbiddenUsersDropTableDelete = {
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  body: {
    hasBeenSuccessful: false,
    errors: 'Not authorized. Token missing or wrong',
    redirect: 'http://localhost:8081/api/v1/users/dropTable',
  },
  config: {
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    headers: {
      Accept: 'application/json, text/plain, */*',
      authorization: 'Bearer wrongToken',
      'User-Agent': 'axios/0.18.0',
    },
    method: 'delete',
    url: 'http://localhost:8080/GatewayApi/files/dropTable',
    data: undefined,
  },
  files: undefined,
  buffered: true,
  header: {
    server: 'GatewayApi',
    'content-encoding': 'gzip',
    'content-type': 'application/json',
    accepts: 'POST',
    date: 'Tue, 13 Nov 2018 19:06:19 GMT',
    connection: 'close',
    'transfer-encoding': 'chunked',
  },
  statusCode: 403,
  status: 403,
  statusType: 2,
  info: false,
  ok: true,
  redirect: false,
  clientError: false,
  serverError: false,
  error: false,
  created: true,
  accepted: false,
  noContent: false,
  badRequest: false,
  unauthorized: false,
  notAcceptable: false,
  forbidden: true,
};
