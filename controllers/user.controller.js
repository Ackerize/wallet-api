const User = require("../models/User");

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user = new User(req.body);

  User.findByUsernameOrEmail(req.body, (err, data) => {
    if (data)
      res.status(400).send({
        message: "A user with that username or email already exists.",
      });
    else
      User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User.",
          });
        else res.status(200).send(data);
      });
  });
};

// Find a single User with a username and password
exports.findOne = (req, res) => {
  User.findByUsernameAndPassword(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Incorrect credentials.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with username " + req.body.username,
        });
      }
    } else res.status(200).send(data);
  });
};
