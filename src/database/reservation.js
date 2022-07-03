const {con} = require('./config');
const {getTolerance} = require('./room');

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

function subtractHours(numOfHours, date = new Date()) {
  date.setHours(date.getHours() - numOfHours);

  return date;
}

const ISOStringToNormalDate = (oldDate) => {
  return oldDate.split('T')[0] + ' ' + oldDate.split('T')[1].split('.')[0];
};

// confirma se existe reserva e se ela pode ser executada naquele momento
const confirmReservation = ({id_user, id_room}, callback) => {
  const sql = `SELECT * FROM reservation WHERE id_user=${id_user} AND id_room=${id_room};`;

  con.query(sql, function (err, res) {
    if (res?.length > 0) {
      let {start_time, id_reservation} = res[0];

      start_time = Number(start_time);

      const timeNow = new Date();
      const timeStart = new Date(start_time);

      timeStart.setHours(timeStart.getHours() - 3);
      timeNow.setHours(timeNow.getHours() - 3);

      if (timeNow.getTime() > timeStart.getTime()) {
        getTolerance(id_room, (err2, result) => {
          const toleranceTime = new Date(timeStart.getTime() + (Number(result) / 60) * 60000);
          if (timeNow.getTime() < toleranceTime.getTime()) {
            activeReservation(id_reservation);
            callback('Acesso liberado!', null);
          } else {
            deleteReservation(id_reservation);
            callback('O prazo de entrada está expirado!', null);
          }
        });
      } else {
        callback('A reserva ainda não está disponível!', null);
      }
    } else {
      callback('Não existe reserva para esse usuário e essa sala!', null);
    }
  });
};

const activeReservation = (idReservation) => {
  const sql = `UPDATE reservation SET is_active=1 WHERE id_reservation=${idReservation};`;

  con.query(sql, function (err, res) {
    if (err) throw err;
  })
}

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
  confirmReservation,
}