const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "4321",
  database: "innodb",
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM sing_in", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/create", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const card = req.body.card;
  const address = req.body.address;

  db.query(
    "INSERT INTO sing_in (username, password, card, address) VALUES (?,?,?,?)",
    [username, password, card, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM sing_in WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});