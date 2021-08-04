const sql = require("../config/database");
const bcrypt = require("bcrypt");

const User = function ({ username, email, password }) {
  this.username = username;
  this.email = email;
  this.password = bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(+process.env.SALT_ROUNDS),
    null
  );
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByUsernameAndPassword = ({ username, password }, result) => {
  sql.query(
    `SELECT * FROM users WHERE username = "${username}"`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        const comparison = bcrypt.compareSync(password, res[0].password);
        if (comparison) {
          result(null, res[0]);
          return;
        }
      }
      // not found User with the username and password
      result({ kind: "not_found" }, null);
    }
  );
};

User.findByUsernameOrEmail = ({ username, email }, result) => {
  sql.query(
    `SELECT * FROM users WHERE username = "${username}" OR email = "${email}"`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found User with the username and password
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = User;
