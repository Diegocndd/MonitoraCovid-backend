const {con} = require('./config');

const addUser = (data, callback) => {
  const { name, username, password, email, is_admin } = data;
  const sql = `INSERT INTO user (name, username, password, email, is_admin) VALUES ('${name}', '${username}', '${password}', '${email}', ${is_admin});`
  con.query(sql, function (err, res) {
      if (err) {
        if (typeof(name) != 'string') {
          callback("invalid type for name", false);
        } else if (typeof(username) != 'string') {
          callback("invalid type for username", false);
        } else if (typeof(password) != 'string') {
          callback("invalid type for password", false);
        } else if (typeof(email) != 'string') {
          callback("invalid type for email", false);
        } else if (typeof(is_admin) != 'boolean') {
          callback("invalid type for is_admin", false);
        } else {
          callback(err, false);
        }
      }
  });
};

module.exports = {
  addUser,
}