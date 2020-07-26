const mongoose = require("mongoose");
const { Schema } = mongoose;

const StateSchema = new Schema({
  idState: { type: Number, required: true, unique: true },
  nameState: { type: String, required: true, unique: true },
  usersNumberState: { type: Number, default: 0 },
  positiveAnalysisState: { type: Number, default: 0 },
  deadAnalysisState: { type: Number, default: 0 },
  positiveGovernmentState: { type: Number, default: 0 },
  deadGovernmentState: { type: Number, default: 0 },
  counties: [
    {
      idCounty: { type: Number, required: true, unique: true },
      nameCounty: { type: String, required: true, unique: true },
      trafficLightGovernmentCounty: { type: String, default: "gray" },
      trafficLightAnalysisCounty: { type: String, default: "gray" },
      usersNumberCounty: { type: Number, default: 0 },
      positiveAnalysisCounty: { type: Number, default: 0 },
      deadAnalysisCounty: { type: Number, default: 0 },
      positiveGovernmentCounty: { type: Number, default: 0 },
      deadGovernmentCounty: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("State", StateSchema);
