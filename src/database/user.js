const {con} = require('./config');

const addUser = (data) => {
  const { name, username, password, email, is_admin } = data;
  const sql = `INSERT INTO user (name, username, password, email, is_admin) VALUES ('${name}', '${username}', '${password}', '${email}', ${is_admin});`
  con.query(sql, function (err, res) {
      if (err) throw err;
  });
};

const loginUser = (data, callback) => {
  const {username, password} = data;
  const sql = `SELECT * FROM user WHERE username='${username}' AND password='${password}'`;

  con.query(sql, function (err, res) {
    if (res && res.length > 0) {
      callback(null, res[0]);
    } else {
      callback(true, null);
    }
  });
};

module.exports = {
  addUser,
  loginUser,
}