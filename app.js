const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/authenticate";
const Todo = require("./backend/models/data.js");
const ExpressError = require("./backend/utils/expresserror.js");
const cors = require("cors");

app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());


async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

  app.listen(8080, () => {
  console.log("Listening on port 8080");
});

app.get("/", (req, res)=> {
    res.send("workin progress");
})