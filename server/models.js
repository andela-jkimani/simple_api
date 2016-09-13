(function() {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var bcrypt = require('bcrypt');

  var userSchema = new Schema({
    username: String,
    password: String
  });

  userSchema.pre('save', function(done) {
    this.password = bcrypt.hashSync(this.password, 10);
    done();
  });

  module.exports = mongoose.model('User', userSchema);
})();
