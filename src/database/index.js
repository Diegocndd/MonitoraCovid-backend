const userDB = require('./user');
const roomDB = require('./room');

const { addUser } = userDB;
const { addRoom } = roomDB;

module.exports = {
  addUser,
  addRoom,
};
