const userDB = require('./user');
const roomDB = require('./room');
const reservationDB = require('./reservation');

const { addUser } = userDB;
const { addRoom, getRooms } = roomDB;
const {
  addReservation,
  getReservationsByUser,
  getReservationsByRoom
} = reservationDB;

module.exports = {
  addUser,
  addRoom,
  getRooms,
  addReservation,
  getReservationsByUser,
  getReservationsByRoom,
};
