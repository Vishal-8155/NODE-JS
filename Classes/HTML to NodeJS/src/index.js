const express = require("express");
const app = express();
const path = require("path");
const body = require("body-parser");

const bodyParse = body.urlencoded({ extended: false });
// extended false - string & array
// extended true - object & json format
app.set("view engine", "ejs");

const mainPath = path.join(__dirname, "../images");
app.use(express.static(mainPath));

console.log(__dirname);
console.log(mainPath);

let edtData = "";
let userData = [];

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.listen(5000, "127.0.0.1", () => {
  console.log("Successfully started server");
});
