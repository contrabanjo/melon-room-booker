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

app.get('/rooms', (req, res)=>{
  db.getAllRooms().then(result => res.send(result.rows));
})

app.get('/hours',(req, res)=>{
  db.getOpenHoursForDay(req.query.day, req.query.institution).then(result => {
    res.send(result.rows[0][req.query.day])
  });
})

app.post('/bookings', (req, res)=>{
  db.addBooking(req.body.room, req.body.date, req.body.user);
  res.send()
})

app.get('/bookings', (req, res)=>{
  db.getBookingsForRoom(req.query.room, req.query.date).then(result=> res.send(result.rows));
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

