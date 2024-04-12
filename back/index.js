require("dotenv").config();
const PORT = process.env.PORT || 2000;
const express = require("express");
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token");

app.use(cors());
app.use(express.json()); // untuk menangkap request body
app.use(bearerToken()); // untuk menangkap token dari request header

app.get("/", (req, res) => {
  return res.status(200).send("<h1>API RUNNING</h1>")
});

// Define Router
const { accountsRouter, tweetsRouter } = require("./routers")
app.use("/accounts", accountsRouter);
app.use("/tweets", tweetsRouter);
app.use("/public", express.static("public"))

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  return res.status(200).send(error)
})

app.listen(PORT, () => {
  console.log(`API RUNNING ON PORT ${PORT}`);
});