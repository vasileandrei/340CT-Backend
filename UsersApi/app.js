const restify = require('restify');
const NewRouter = require('restify-router').Router;

const router = new NewRouter();
const usersIndex = require('./routes/usersIndex');

const port = 8081;

const server = restify.createServer({
  name: 'UsersApi',
  version: '1.0.0',
});

const logger = require('./basic-logger');

server.use(restify.plugins.throttle({
  burst: 100, // Max 10 concurrent requests (if tokens)
  rate: 2, // Steady state: 2 request / 1 seconds
  ip: true, // throttle per IP
}));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());

router.add('/api/v1/users/', usersIndex);
router.applyRoutes(server);

server.on('after', restify.plugins.metrics({ server }, (err, metrics) => {
  logger.trace(`${metrics.method} ${metrics.path} ${metrics.statusCode} ${metrics.latency} ms`);
}));

server.listen(port, () => {
  logger.info('%s listening at %s', server.name, server.url);
});

server.on('uncaughtException', (req, res, route, err) => {
  logger.error(err);
});
