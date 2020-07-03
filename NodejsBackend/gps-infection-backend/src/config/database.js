const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/gps-infection", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  })
  .then((db) => console.log("DB is connected"))
  .catch((error) => console.error(console.error()));
