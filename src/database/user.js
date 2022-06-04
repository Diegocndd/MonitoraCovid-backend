const {con} = require('./config');

const addUser = (data) => {
  const { name, username, password, email, is_admin } = data;
  const sql = `INSERT INTO user (name, username, password, email, is_admin) VALUES ('${name}', '${username}', '${password}', '${email}', ${is_admin});`
  con.query(sql, function (err, res) {
      if (err) throw err;
  });
};

module.exports = {
  addUser,
}