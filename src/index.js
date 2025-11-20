const express = require("express");
const { ConnectDB } = require("./config/dbConnection");

const app = express();

ConnectDB().then(() => {
  console.log(`DATABASE CONNECTED..`);

  app.listen(process.env.PORT_NUMBER, () => {
    console.log(`PORT IS LISTENING...`);
  });
});
