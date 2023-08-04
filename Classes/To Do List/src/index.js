const express = require("express");
const app = express();
const path = require("path");
const body = require("body-parser");

const bodyParse = body.urlencoded({ extended: false });
// extended false - string & array
// extended true - object & json format
app.set("view engine", "ejs");

const mainPath = path.join(__dirname, "../public");
app.use(express.static(mainPath));

let edtData = "";
let userData = [];

app.get("/saveGet", (req, res) => {
  res.render("todolist", {
    data: userData,
    userEdit: edtData,
  });
});

app.get("/del/:id", (req, res) => {
  let id = req.params.id;
  id = id - 1;
  userData.splice(id, 1);
  let j = 1;
  userData.forEach((i) => {
    i.id = j;
    j++;
  });
  res.redirect("/saveGet");
});

app.post("/save", bodyParse, (req, res) => {

  let uid = userData.length + 1;
  let udata = {
    id: uid,
    name: req.body.name,
    age: req.body.age,
    mobile: req.body.mobile
  }

  userData.push(udata);

  res.redirect('/saveGet');

});

app.listen(7000, "127.0.0.1", () => {
  console.log("Successfully started server");
});
