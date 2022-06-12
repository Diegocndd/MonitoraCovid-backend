const {con} = require('./config');

const addReservation = (data) => {
  const { start_time, end_time, id_user, id_room } = data;
  const sql = `INSERT INTO reservation (start_time, end_time, id_user, id_room) VALUES ('${start_time}', '${end_time}', ${id_user}, ${id_room});`
  con.query(sql, function (err, res) {
    if (err) throw err;
  });
};

const getReservationsByUser = (userId, callback) => {
  const sql = `SELECT * FROM reservation WHERE id_user=${Number(userId)};`;
  con.query(sql, function (err, res) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, res);
    }
  });
};

const getReservationsByRoom = (roomId, callback) => {
  const sql = `SELECT * FROM reservation WHERE id_room=${Number(roomId)};`;
  con.query(sql, function (err, res) {
    if (err) {
      callback(err, false);
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