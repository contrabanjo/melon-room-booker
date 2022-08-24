const express = require("express");
const path = require('path');

//const fs = require('fs');
//const cors = require('cors');

const db = require('./db.js');

const app = express();


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

app.use(express.static(path.join(__dirname, "public")))
//app.use(express.static("public"))


//app.use(cors());

// app.get('*', (req, res) => {
//    //res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

app.get('/rooms', (req, res)=>{
  db.getAllRooms().then(result => res.send(result.rows));
})

app.get('/hours',(req, res)=>{
  db.getOpenHoursForDay(req.query.day, req.query.institution).then(result => {
    res.send(result.rows[0][req.query.day])
  });
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

