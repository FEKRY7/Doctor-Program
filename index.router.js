const express = require("express");

const userRouter = require("./src/modules/auth/auth.router.js");
const DiabetesRouter = require("./src/modules/Diabetes/Diabetes.router.js");
const liverRouter = require("./src/modules/liver/liver.router.js");
const HeartRouter = require("./src/modules/Heart/Heart.router.js");
const ChronicRouter = require("./src/modules/Chronic/Chronic.router.js");
const CancerRouter = require("./src/modules/Cencer/Cancer.router.js");
const malariaRouter = require("./src/modules/malaria/malaria.router.js");
const penumoniaRouter = require("./src/modules/penumonia/penumonia.router.js");
const mongoConnection = require("./Database/dbConnection.js");

const AppRouter = (app) => {
  mongoConnection();
  //convert Buffer Data
  // Middleware to parse JSON
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Routes
  app.use("/api/auth", userRouter);
  app.use("/api/Diabetes", DiabetesRouter);
  app.use("/api/liver", liverRouter);
  app.use("/api/Heart", HeartRouter);
  app.use("/api/Chronic", ChronicRouter);
  app.use("/api/Cancer", CancerRouter);
  app.use("/api/malaria", malariaRouter);
  app.use("/api/penumonia", penumoniaRouter);
};

module.exports = AppRouter;
