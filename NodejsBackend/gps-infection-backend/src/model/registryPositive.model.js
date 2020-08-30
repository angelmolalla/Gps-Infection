const mongoose = require("mongoose");
const { Schema } = mongoose;

const RegistryPositiveSchema = new Schema({
  idCollection: { type: String, required: true },
  typeCollection: { type: String, required: true },
  nameCollection: { type: String, required: true },
  valuePositive: { type: String, required: true },
  nameProcess: { type: String, required: true },
  nameUser: { type: String, required: true },
  emailUSer: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RegistryPositive", RegistryPositiveSchema);
