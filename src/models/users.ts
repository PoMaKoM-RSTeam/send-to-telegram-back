import { Schema, model } from 'mongoose';

const Users = new Schema({
  userid: String,
  first_name: String,
  username: String,
  auth_date: String,
  hash: String,
});

export default model('Users', Users);
