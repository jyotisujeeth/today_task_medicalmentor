const path = require("path");
const fs = require("fs");
const express = require("express");


const User = require("./models/user");


const sequelize = require("./util/database");



sequelize
  .sync()
  .then((res) => {
    app.listen(3000, (err) => {
      if (err) console.log(err);
      console.log(`server is listing to 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


  