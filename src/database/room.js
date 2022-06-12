const {con} = require('./config');

const addRoom = (data) => {
  const { name, max_amount, required_appointment, delay_tolerance } = data;
  let sql;

  if (delay_tolerance) {
    sql = `INSERT INTO room (name, required_appointment, max_amount, delay_tolerance) VALUES ('${name}', ${required_appointment}, ${max_amount}, ${delay_tolerance});`
  } else {
    sql = `INSERT INTO room (name, required_appointment, max_amount) VALUES ('${name}', ${required_appointment}, ${max_amount});`
  }

  con.query(sql, function (err, res) {
    if (err) throw err;
  });
};

const getRooms = (callback) => {
  const sql = 'SELECT * FROM room;';

  con.query(sql, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

module.exports = {
  addRoom,
  getRooms,
}