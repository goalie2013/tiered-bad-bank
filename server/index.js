const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dal = require("./dal");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello Express");
});

// Create User
app.post("/api/users", (req, res) => {
  console.log("post", req.query, req.params, req.body);
  console.log(req.body.name);
  // res.send(req.body);
});

// app.get("/api/users", (req, res) => {
//   console.log("get", req.query, req.params, req.body);
//   res.send(req.data);
// });

// Create User
app.get("/account/create/:name/:email/:password", async (req, res) => {
  /* Using Promises Syntax 
  dal.createUser(req.params.name,
    req.params.email,
    req.params.password).then(user => {
      console.log(user);
      res.send(user)
    }).catch(err => console.log(err))
  */

  /* Using Async/Await Syntax */
  try {
    const newUser = await dal.createUser(
      req.params.name,
      req.params.email,
      req.params.password
    );
    console.log("newUser", newUser);
    res.send(newUser);
  } catch (err) {
    console.log("Error on create User:", err);
  }
});

// Get All Users
app.get("/account/all", async (req, res) => {
  try {
    const allUsers = await dal.getAllUsers();
    console.log("allUsers", allUsers);
    res.send(allUsers);
  } catch (err) {
    console.log("Error on get all Users:", err);
  }
});

app.listen(3000);

// in client's package.json:
// "proxy": "http://localhost:1234",
