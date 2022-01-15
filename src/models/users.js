const { Schema, model } = require('mongoose');

const Users = new Schema({
  userid: String,
  first_name: String,
  username: String,
  auth_date: String,
  hash: String,
});

module.exports = model('Users', Users);
