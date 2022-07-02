const {con} = require('./config');

const addReservation = (data, callback) => {
  const { start_time, end_time, id_user, id_room } = data;
  const sql = `INSERT INTO reservation (start_time, end_time, id_user, id_room) VALUES ('${start_time}', '${end_time}', ${id_user}, ${id_room});`
  con.query(sql, function (err, res) {
    if (err) {
      if (typeof(start_time) != 'string'){
        callback("invalid type for start_time", false);
      } else if (typeof(end_time) != 'string'){
        callback("invalid type for end_time", false);
      } else if (typeof(id_user) != 'numer'){
        callback("invalid type for id_user", false);
      } else if (typeof(id_room) != 'numer'){
        callback("invalid type for id_room", false);
      } else {
        callback(err, false);
      }
    }
  });
};

const getReservationsByUser = (userId, callback) => {
  const sql = `SELECT * FROM reservation WHERE id_user=${Number(userId)};`;
  con.query(sql, function (err, res) {
    if (err) {
      if (typeof(userId) != 'number'){
        callback("invalid type for userId", false);
      }else {
        callback(err, false);
      }
    } else {
      callback(null, res);
    }
  });
};

const getReservationsByRoom = (roomId, callback) => {
  const sql = `SELECT * FROM reservation WHERE id_room=${Number(roomId)};`;
  con.query(sql, function (err, res) {
    if (err) {
      if (typeof(roomId) != 'number'){
        callback('invalid type for roomId', false);
      }else {
        callback(err, false);
      }
    } else {
      callback(null, res);
    }
  });
};

const deleteReservation = (idReservation) => {
  const sql = `DELETE FROM reservation WHERE id_reservation=${idReservation};`;

  con.query(sql, function (err, res) {
    if (err) throw err;
  });
};

module.exports = {
  addReservation,
  deleteReservation,
  getReservationsByUser,
  getReservationsByRoom,
}