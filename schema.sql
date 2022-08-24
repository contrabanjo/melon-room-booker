DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS institutions;

CREATE TABLE IF NOT EXISTS rooms(id SERIAL2 PRIMARY KEY, name VARCHAR(120), institution SMALLINT);
CREATE TABLE IF NOT EXISTS bookings(id SERIAL PRIMARY KEY, room_name VARCHAR(120), date_of TIMESTAMP, user_id VARCHAR(120));
CREATE TABLE IF NOT EXISTS institutions(
	id SERIAL2 PRIMARY KEY, 
	name VARCHAR(120), 
	monday TIME[2],
	tuesday TIME[2], 
	wednesday TIME[2], 
	thursday TIME[2],
	friday TIME[2], 
	saturday TIME[2], 
	sunday TIME[2]
);

INSERT INTO institutions VALUES(
	DEFAULT,
	'Walnut Creek Library',
	'{10:00:00, 20:00:00}',
	'{10:00:00, 20:00:00}',
	'{10:00:00, 18:00:00}',
	'{10:00:00, 18:00:00}',
	'{9:00:00, 16:00:00}',
	'{9:00:00, 16:00:00}',
	'{0:00:00, 0:00:00}'
);

INSERT INTO rooms VALUES
(DEFAULT, 'Live Oak Room', 1),
(DEFAULT, 'Blue Oak Room', 1),
(DEFAULT, 'Black Oak Room', 1),
(DEFAULT, 'Redwood Room', 1),
(DEFAULT, 'Las Trampas Conference Room', 1);

SELECT rooms.name, * FROM rooms JOIN institutions ON rooms.institution = institutions.id;