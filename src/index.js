const express = require("express");
const { ConnectDB } = require("./config/dbConnection");
const {
  authenticationController,
} = require("./routes/authenticationController");
const cookieParser = require("cookie-parser");
const { contentController } = require("./routes/contentController");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", authenticationController);
app.use("/api/v1", contentController);

ConnectDB().then(() => {
  console.log(`DATABASE CONNECTED..`);

  app.listen(process.env.PORT_NUMBER, () => {
    console.log(`PORT IS LISTENING...`);
  });
});
