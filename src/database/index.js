const userDB = require('./user');
const roomDB = require('./room');
const reservationDB = require('./reservation');

const { addUser } = userDB;
const { addRoom, getRooms } = roomDB;
const {
  addReservation,
  deleteReservation,
  getReservationsByUser,
  getReservationsByRoom
} = reservationDB;

module.exports = {
  addUser,
  addRoom,
  getRooms,
  addReservation,
  deleteReservation,
  getReservationsByUser,
  getReservationsByRoom,
};
