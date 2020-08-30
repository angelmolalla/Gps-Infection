const RegistryPositive = require("../model/registryPositive.model");
exports.findAll = async (req, res, next) => {
  RegistryPositive.find()
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
