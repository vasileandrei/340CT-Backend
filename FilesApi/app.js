const restify = require('restify');
const NewRouter = require('restify-router').Router;

const router = new NewRouter();

const filesIndex = require('./routes/filesIndex');

const port = 8082;

const server = restify.createServer({
  name: 'FilesApi',
  version: '1.0.0',
});

const logger = require('./basic-logger');

// server.use(upload);
server.use(restify.plugins.throttle({
  burst: 100, // Max 10 concurrent requests (if tokens)
  rate: 2, // Steady state: 2 request / 1 seconds
  ip: true, // throttle per IP
}));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.urlEncodedBodyParser({ extended: false }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());

router.add('/api/v1/files/', filesIndex);
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
