const NewRouter = require('restify-router').Router;

const router = new NewRouter();

router.get('/', (req, res) => {
  res.send('Hello from baseGet, GatewayApi Index');
});

module.exports = router;
