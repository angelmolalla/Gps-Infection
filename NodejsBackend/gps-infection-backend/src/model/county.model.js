const mongoose = require("mongoose");
const { Schema } = mongoose;
const State = require("../model/state.model");
const ObjectId = require("mongodb").ObjectId;

const CountySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  state: { type: ObjectId, ref: State },
  trafficLightGovernment: { type: String, default: "gray" },
  trafficLightAnalysis: { type: String, default: "gray" },
  usersNumber: { type: Number, default: 0 },
  positiveAnalysis: { type: Number, default: 0 },
  deadAnalysis: { type: Number, default: 0 },
  positiveGovernment: { type: Number, default: 0 },
  deadGovernment: { type: Number, default: 0 },
});

module.exports = mongoose.model("County", CountySchema);
