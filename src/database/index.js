const userDB = require('./user');
const roomDB = require('./room');
const reservationDB = require('./reservation');

const { addUser, validateFile } = userDB;
const { addRoom, getRooms } = roomDB;
const {
  addReservation,
  deleteReservation,
  getReservationsByUser,
  getReservationsByRoom
} = reservationDB;

module.exports = {
  addUser,
  validateFile,
  addRoom,
  getRooms,
  addReservation,
  deleteReservation,
  getReservationsByUser,
  getReservationsByRoom,
};
