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

// function addPodcastToDB(guid){
//   let sql;
//   if (guid.length < 7) sql = "INSERT INTO podcasts VALUES('" + guid  + "', DEFAULT, DEFAULT) ON CONFLICT (guid) DO NOTHING;";
//   else sql = "INSERT INTO podcasts VALUES " + guid  +  " ON CONFLICT (guid) DO NOTHING;";
//   pool.connect((err, client, release)=> {
//     if (err){
//       return console.error("Error acquiring client", err.stack)
//     }
//     client.query(sql, (err, result)=>{
//       release()
//       if (err) {
//         return console.error("Error adding podcast to DB:", err.stack)
//       }
//     })
//   })
// }

function getAllRooms(){
  const sql = "SELECT * FROM rooms;"
  return pool.query(sql);
}

function getOpenHoursForDay(day, institutionID){
  const sql = "SELECT " + day +  " FROM institutions WHERE ID =" + institutionID + ";"
  return pool.query(sql);
}

// getAllRooms().then( res => {
//   console.log(res.rows)
// })

// getOpenHoursForDay("monday", 1).then(res => console.log(res.rows))

module.exports.getAllRooms = getAllRooms;
module.exports.getOpenHoursForDay = getOpenHoursForDay;