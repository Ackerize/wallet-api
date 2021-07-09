const sql = require("../config/database");

const User = function ({ username, email, password }) {
  this.username = username;
  this.email = email;
  this.password = password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByUsernameAndPassword = ({username, password}, result) => {
  sql.query(
    `SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
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

User.findByUsernameOrEmail = ({username, email}, result) => {
    sql.query(
      `SELECT * FROM users WHERE username = "${username}" OR email = "${email}"`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
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