(function() {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var bcrypt = require('bcrypt');

  var userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  });

  // Saves user's password hashed before saving it in database
  userSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          return next();
        });
      });
    } else {
      return next();
    }
  });

  // Create method to compare password input to password saved in database
  userSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      return cb(null, isMatch);
    });
  };

  module.exports = mongoose.model('User', userSchema);
})();
