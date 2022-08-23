--DROP TABLE IF EXISTS rooms;
--DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS institutions;

--CREATE TABLE IF NOT EXISTS rooms(id SERIAL2 PRIMARY KEY, name VARCHAR(120), institution SMALLINT);
--CREATE TABLE IF NOT EXISTS bookings(id SERIAL PRIMARY KEY, room_name VARCHAR(120), date_of TIMESTAMP, user_id VARCHAR(120));
CREATE TABLE IF NOT EXISTS institutions(
	id SERIAL2 PRIMARY KEY, 
	name VARCHAR(120), 
	mon_open TIME, mon_close TIME, 
	tue_open TIME, tue_close TIME, 
	wed_open TIME, wed_close TIME, 
	thu_open TIME, thu_close TIME, 
	fri_open TIME, fri_close TIME, 
	sat_open TIME, sat_close TIME, 
	sun_open TIME, sun_close TIME
);

INSERT INTO institutions VALUES(
	DEFAULT,
	'Walnut Creek Library',
	'10:00:00', '20:00:00',
	'10:00:00', '20:00:00',
	'10:00:00', '18:00:00',
	'10:00:00', '18:00:00',
	'9:00:00', '16:00:00',
	'9:00:00', '16:00:00',
	'0:00:00', '0:00:00'
);

-- INSERT INTO rooms VALUES
-- (DEFAULT, 'Live Oak Room', 1),
-- (DEFAULT, 'Blue Oak Room', 1),
-- (DEFAULT, 'Black Oak Room', 1),
-- (DEFAULT, 'Redwood Room', 1),
-- (DEFAULT, 'Las Trampas Conference Room', 1),
-- (DEFAULT, 'Black Oak Room', 1);

SELECT rooms.name, * FROM rooms JOIN institutions ON rooms.institution = institutions.id;