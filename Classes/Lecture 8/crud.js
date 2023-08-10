const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const database = "classes";
const client = new MongoClient(url);
const path = require("path");
const body = require("body-parser");

const bodyParse = body.urlencoded({ extended: false });
// extended false - string & array
// extended true - object & json format
app.set("view engine", "ejs");

let userData = [];

const mainPath = path.join(__dirname, "../public");
app.use(express.static(mainPath));

let edtData = "";

app.get("/saveGet", (req, res) => {

  const mongouserdata = async () => {

    let result = await fetch("http://127.0.0.1:7000/getusers");
    result = await result.json();
    userData = result;

  }

  mongouserdata();
  
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

  const getUsers = async () => {

    await fetch("http://127.0.0.1:7000/getusers");

  }

  getUsers();

});

app.get('/getusers', async (req, res) => {

  async function mongoinsertdata() {

    const result = await client.connect();
    const db = result.db(database);
    const collection = db.collection('users');
    let users = await collection.find();
    console.log(users);
    res.send(users);
  
  }
  
  mongoinsertdata();

})

app.get('/edit/:id', bodyParse, (req, res) => {

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


// id = req.body.id;
  // if (id != '') {

  //   userData.forEach((i) => {
  //     if (i.id == id) {
  //       i.name = req.body.name;
  //       i.mobile = req.body.mobile;
  //       i.age = req.body.age;
  //     }

  //   })

  // } else {

  //   let uid = userData.length + 1;
  //   let udata = {
  //     id: uid,
  //     name: req.body.name,
  //     age: req.body.age,
  //     mobile: req.body.mobile
  //   }

  //   userData.push(udata);

  // }
  // edtData = '';
  // res.redirect('/saveGet')
