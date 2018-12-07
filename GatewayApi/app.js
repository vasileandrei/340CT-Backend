/* eslint-disable global-require */
const restify = require('restify');
const router = new (require('restify-router')).Router();
const corsMiddleware = require('restify-cors-middleware');

const userRouter = require('./routes/users');
const filesRouter = require('./routes/files');
const emailRouter = require('./routes/emails');
const gatewayIndex = require('./routes/index');

const port = 8080;

const cors = corsMiddleware({
  allowHeaders: ['Authorization'],
  preflightMaxAge: 5,
  origins: ['*'],
});

const server = restify.createServer({
  name: 'GatewayApi',
  version: '1.0.0',
});

const logger = require('./basic-logger');

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.throttle({
  burst: 100, // Max 10 concurrent requests (if tokens)
  rate: 2, // Steady state: 2 request / 1 seconds
  ip: true, // throttle per IP
}));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.urlEncodedBodyParser());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());

router.add('/GatewayApi/users', userRouter);
router.add('/GatewayApi/files', filesRouter);
router.add('/GatewayApi/email', emailRouter);
router.add('/GatewayApi/', gatewayIndex);
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
