const mongoose = require("mongoose");
const { Schema } = mongoose;

const StateSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  usersNumber: { type: Number, default: 0 },
  positiveAnalysis: { type: Number, default: 0 },
  deadAnalysis: { type: Number, default: 0 },
  positiveGovernment: { type: Number, default: 0 },
  deadGovernment: { type: Number, default: 0 },
});

module.exports = mongoose.model("State", StateSchema);
