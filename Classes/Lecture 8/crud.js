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

const mainPath = path.join(__dirname, "../public");
app.use(express.static(mainPath));

let edtData = "";
let userData = [];

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

  async function mongodeletedata() {

    const result = await client.connect();
    const db = result.db(database);
    const collection = db.collection('users');
    const response = await collection.deleteOne({id:req.params.id});

    if (response.acknowledged) {
      console.log('record deleted');
    }else{
      console.log('record not deleted');
    }

  }

  mongodeletedata();

  res.redirect("/saveGet");
});

app.post("/save", bodyParse, (req, res) => {

  id = req.body.id;
  if (id != '') {

    userData.forEach((i) => {
      if (i.id == id) {
        i.name = req.body.name;
        i.mobile = req.body.mobile;
        i.age = req.body.age;
      }

    })

  } else {

    let uid = userData.length + 1;
    let udata = {
      id: uid,
      name: req.body.name,
      age: req.body.age,
      mobile: req.body.mobile
    }

    userData.push(udata);

    async function mongoinsertdata() {

      const result = await client.connect();
      const db = result.db(database);
      const collection = db.collection('users');
      await collection.insertOne(udata);

    }

    mongoinsertdata();

  }
  edtData = '';
  res.redirect('/saveGet')

});

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
