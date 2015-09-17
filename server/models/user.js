var mongoose = require('mongoose');

var User = mongoose.Schema({
  username: String,
  email: String
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/github-auth');

module.exports = mongoose.model('users', User);
