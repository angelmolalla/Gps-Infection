const RegistryDeath = require("../model/registryDeath.model");
exports.findAll = async (req, res, next) => {
  RegistryDeath.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while get State",
      });
    });
};
