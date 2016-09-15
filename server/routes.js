module.exports = function(app) {
  var User = require('./controller');
  var passport = require('passport');

  require('../config/passport')(passport);

  app.use(passport.initialize());

  app.get('/', function(req, res) {
    res.send({ message: 'Welcome to my API' });
  });

  app.post('/register', User.register);

  app.post('/authenticate', User.authenticate);

  app.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
  });

  // app.post('/signup', User.signup);
  // app.post('/login', User.login);
  //
  app.route('/users')
    .get(User.authenticate, User.getAll);
  //
  // app.route('/users/:id')
  //   .post(User.authenticate, User.getOne);
};
