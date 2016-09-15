var User = require('./models');
// var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');


module.exports = {
  // signup: function(req, res) {
  //   if (!req.body.email || !req.body.password) {
  //     res.json({ success: false, message: 'Please enter your email and password to register!' });
  //   } else {
  //     var newUser = new User({
  //       email: req.body.email,
  //       password: req.body.password
  //     });
  //     // save new user
  //     newUser.save(function(err) {
  //       if (err) {
  //         res.json({ success: false, message: 'Email address already exists' });
  //       } else {
  //         res.json({ success: true, message: 'Successfully created new user' });
  //       }
  //     });
  //   }
  // },

  register: function(req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, message: 'Please enter email and password.' });
    } else {
      var newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      // Attempt to save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({ success: false, message: 'That email address already exists.' });
        }
        res.json({ success: true, message: 'Successfully created new user.' });
      });
    }
  },

  authenticate: function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, config.secret, {
              expiresIn: 10080 // in seconds
            });
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.send({ success: false, message: 'Authentication failed. Passwords dont match.' });
          }
        });
      }
    });
  },

  // login: function(req, res) {
  //   User.findOne({
  //     email: req.body.email
  //   }, function(err, user) {
  //     if (err) throw err;
  //     if (!user) {
  //       res.send({ success: false, message: 'Authentication failed. User not found' });
  //     } else {
  //       // check if password matches
  //       bcrypt.compareSync(req.body.password, user.password, function(isMatch) {
  //         if (isMatch && !err) {
  //           // create token
  //           var token = jwt.sign(user, config.secret, {
  //             expiresIn: 10080 // a week in seconds
  //           });
  //           res.json({ success: true, token: 'JWT ' + token });
  //         } else {
  //           res.json({ success: false, message: 'Authentication failed. Wrong password' });
  //         }
  //       });
  //     }
  //   });
  // },
  //
  getAll: function(req, res) {
    var query = req.query;
    User.find(query, function(err, user) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(user);
      }
    });
  }
  //
  // getOne: function(req, res) {
  //   User.findOne({ _id: req.params.id }, function(err, user) {
  //     if (err) {
  //       res.status(404).send({ message: 'user was not found' });
  //     } else {
  //       res.send(user);
  //     }
  //   });
  // },

  // authenticate: function(req, res, next) {
  //   // get the token from body, query or token.
  //   var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //   if (token) {
  //     jwt.verify(token, config.secret, function(err, decoded) {
  //       if (err) {
  //         res.send(err);
  //       } else {
  //        // store the decoded token  info in a request object. To be used in subsequent requests.
  //         req.decoded = decoded;
  //         next();
  //       }
  //     });
  //   } else {
  //     res.status(401).send({ message: 'no token provided, login to get a token.' });
  //   }
  // }
};
