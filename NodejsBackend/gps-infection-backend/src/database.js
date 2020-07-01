const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/gps-infection", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((db) => console.log("DB is connected"))
  .catch((error) => console.error(console.error()));
