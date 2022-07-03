const {con} = require('./config');

const addRoom = (data, callback) => {
  const { name, max_amount, required_appointment, delay_tolerance } = data;
  let sql;

  if (delay_tolerance) {
    sql = `INSERT INTO room (name, required_appointment, max_amount, delay_tolerance) VALUES ('${name}', ${required_appointment}, ${max_amount}, ${delay_tolerance});`
  } else {
    sql = `INSERT INTO room (name, required_appointment, max_amount) VALUES ('${name}', ${required_appointment}, ${max_amount});`
  }

  con.query(sql, function (err, res) {
    if (err){
      if (typeof(name) != 'string') {
        callback("invalid type for name", false);
      } else if (typeof(max_amount) != 'number') {
        callback("invalid type for max_amount", false);
      } else if (typeof(required_appointment) != 'boolean') {
        callback("invalid type for required_appointment", false);
      } else if (typeof(delay_tolerance) != 'int') {
        callback("invalid type for delay_tolerance", false);
      } else {
        callback(err, false);
      }
    } else {
      callback(null, res);
    }
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