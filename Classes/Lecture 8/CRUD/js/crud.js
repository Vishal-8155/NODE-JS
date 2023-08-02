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
let userData = [
  {
    id: 1,
    name: "vishal",
    age: 21,
    mobile: 1234,
  },
  {
    id: 2,
    name: "azim",
    age: 11,
    mobile: 1234,
  },
  {
    id: 3,
    name: "kuntesh",
    age: 30,
    mobile: 1234,
  },
  {
    id: 4,
    name: "bharat",
    age: 25,
    mobile: 1234,
  },
  {
    id: 5,
    name: "parth",
    age: 33,
    mobile: 1234,
  },
];

app.get("/saveGet", (req, res) => {
  res.render("crud", {
    data: userData,
    userEdit: edtData,
  });
});

app.get("/user", (req, res) => {
  res.sendFile(mainPath + "/" + "form.html");
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

  id = req.body.id;
  if (id != '') {

    userData.forEach((i) => {
      if (i.id == id) {
        i.name = req.body.name;
        i.mobile = req.body.number;
        i.age = req.body.age;
      }

    })

  } else {

    let uid = userData.length + 1;
    let udata = {
      id: uid,
      name: req.body.name,
      age: req.body.age,
      mobile: req.body.number
    }

    userData.push(udata);

  }

  res.redirect("/saveGet");


});

app.get('/edit/:id',bodyParse, (req, res) => {

  id = req.params.id;
  edtData = userData.find((i) => {

    return i.id == id;

  })
 
  res.render("crud", {
    data: userData,
    userEdit: edtData,
  });

})

app.listen(7000, "127.0.0.1", () => {
  console.log("Successfully started server");
});
