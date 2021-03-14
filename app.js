const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const bodyParser= require('body-parser');
const config = require('./config');
const env = process.env.NODE_ENV || 'test';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.db[env], config.dbParams);

mongoose.connection.on("error", err => {
    console.log("err", err)
});
  
mongoose.connection.on("connected", () => {
  console.log(`Server is running on env: ${env}.`)
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose is disconnected...")
});

const usersRouter = require("./routes/user.route");
const storeRouter = require("./routes/store.route");

app.use("/api/users", usersRouter);
app.use("/api/stores", storeRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;