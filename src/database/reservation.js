const {con} = require('./config');
const {getTolerance} = require('./room');

const addReservation = (data) => {
  const { start_time, end_time, id_user, id_room } = data;
  const sql = `INSERT INTO reservation (start_time, end_time, id_user, id_room) VALUES ('${start_time}', '${end_time}', ${id_user}, ${id_room});`

  limitRoom(id_room, (err, result) => {
    if (result) {
      removeActualAmount(id_room);
      con.query(sql, function (err2, res2) {
        if (err) throw err;
      })
    }
  });
};

const removeActualAmount = (idRoom) => {
  const sql = `UPDATE room SET actual_amount=actual_amount-1 WHERE id_room=${idRoom};`;

  con.query(sql, function (err, res) {
    if (err) throw err;
  });
}

const addActualAmount = (idRoom) => {
  const sql = `UPDATE room SET actual_amount=actual_amount+1 WHERE id_room=${idRoom};`;

  con.query(sql, function (err, res) {
    // if (err) throw err;
  });
}

const limitRoom = (idRoom, callback) => {
  const sql = `SELECT actual_amount, max_amount FROM room WHERE id_room=${idRoom}`;

  con.query(sql, function (err, res) {
    if (res.length > 0) {
      const {actual_amount} = res[0];
      if (Number(actual_amount) === 0) {
        callback(true, false);
      } else {
        callback(false, true);
      }
    }
  })
}

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

// confirma se existe reserva e se ela pode ser executada naquele momento
const confirmReservation = ({id_user, id_room}, callback) => {
  const sql = `SELECT * FROM reservation WHERE id_user=${id_user} AND id_room=${id_room};`;

  con.query(sql, function (err, res) {
    if (res?.length > 0) {
      let {start_time, id_reservation} = res[0];

      start_time = Number(start_time);

      const timeNow = new Date();
      const timeStart = new Date(start_time);

      timeStart.setHours(timeStart.getHours() + 3);
      timeNow.setHours(timeNow.getHours() - 3);

      if (Number(timeNow.getTime()) > Number(timeStart.getTime())) {
        getTolerance(id_room, (err2, result) => {
          let toleranceTime;
          if (result) {
            toleranceTime = new Date(timeStart.getTime() + (Number(result) / 60) * 60000);
          } else {
            toleranceTime = new Date(timeStart.getTime() + (Number(900) / 60) * 60000);
          }

          if (timeNow.getTime() < toleranceTime.getTime()) {
            activeReservation(id_reservation);
            callback('Acesso liberado!', null);
          } else {
            deleteReservation(id_reservation);
            addActualAmount(id_room);
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