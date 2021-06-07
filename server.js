const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const entries = require("./controllers/entries");

const app = express();
app.use(express.json());
app.use(cors());

const database = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "elsa",
    password: "lyx12345",
    database: "smart-dude",
  },
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, database, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, database, bcrypt);
});

app.put("/image", (req, res) => {
  entries.handleEntries(req, res, database);
});

app.listen(3000, () => {
  console.log("listen successfully");
});

// app.get("/profile/:id", (req, res) => {
//   //http parameter usually uses with get
//   const { id } = req.params; //req.params = {id:input}
//   database("users")
//     .where({
//       id,
//     })
//     .select("*")
//     .then(([profile]) => {
//       if (profile.length) {
//         res.json(profile);
//       } else {
//         res.json("User does not exist");
//       }
//     });
// });
