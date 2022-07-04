const userDB = require('./user');
const roomDB = require('./room');
const reservationDB = require('./reservation');

const { addUser, loginUser } = userDB;
const { addRoom, getRooms, getTolerance, } = roomDB;
const {
  addReservation,
  deleteReservation,
  getReservationsByUser,
  getReservationsByRoom,
  confirmReservation,
} = reservationDB;

module.exports = {
  addUser,
  addRoom,
  getRooms,
  loginUser,
  addReservation,
  deleteReservation,
  getReservationsByUser,
  getReservationsByRoom,
  confirmReservation,
  getTolerance,
};
