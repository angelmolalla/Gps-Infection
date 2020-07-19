const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String },
  salt: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  county: { type: String, required: true },
  state: { type: String, required: true },
  date: { type: Date, default: Date.now },
  admin: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
