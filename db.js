const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false
  // },
  user: 'postgres',
  password: 'root',
  max: 20
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


pool.connect().then(client => {
    client.release();
    console.log('db connection successful')
});


function getAllRooms(){
  const sql = "SELECT * FROM rooms;"
  return pool.query(sql);
}

function getOpenHoursForDay(day, institutionID){
  const sql = "SELECT " + day +  " FROM institutions WHERE ID =" + institutionID + ";"
  return pool.query(sql);
}

//TODO: make it so you can't save a booking to a room/time that already has one
function addBooking(room, date, user){
  const sql ="INSERT INTO bookings VALUES(DEFAULT, '" + room + "','" + date + "','" + user + "');"
  pool.connect((err, client, release)=> {
    if (err){
      return console.error("Error acquiring client", err.stack)
    }
    client.query(sql, (err, result)=>{
      release()
      if (err) {
        return console.error("Error adding booking to DB:", err.stack)
      }
    })
  })
}

function getBookingsForRoom(room, date){
  const sql = "SELECT date_of::time FROM bookings WHERE room_name ='" + room + "' AND DATE(date_of) = '" + date + "';"
  return pool.query(sql);
}

module.exports.getAllRooms = getAllRooms;
module.exports.getOpenHoursForDay = getOpenHoursForDay;
module.exports.addBooking = addBooking;
module.exports.getBookingsForRoom = getBookingsForRoom;