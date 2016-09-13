module.exports = function(app) {
  var User = require('./controller');

  app.get('/', function(req, res) {
    res.send({ message: 'Welcome to my API' });
  });
  app.post('/signup', User.signup);
  app.post('/login', User.login);

  app.route('/users')
    .get(User.authenticate, User.getAll);

  app.route('/users/:id')
    .post(User.authenticate, User.getOne);
};
