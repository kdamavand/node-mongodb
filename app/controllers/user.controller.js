const db = require("../models");
const UserModel = db.users;

// Create and Save a new user
exports.createUser = async (req, res) => {
  
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a user
  const user = new UserModel({
		username: req.body.username,
		password: req.body.password,
		age: req.body.age
  });

  // Save user in the database
  await user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

exports.getAllUsers = async (req, res) =>{
    const username = req.query.username;
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  
    await UserModel.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

// Find a single user with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
  
    await UserModel.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id=" + id });
      });
  };

  // Update a user by the id in the request
exports.update = async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
  };
// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
  
    await UserModel.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete user with id=${id}. Maybe Product was not found!`
          });
        } else {
          res.send({
            message: "user was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id=" + id
        });
      });
  };
// Delete all users from the database.
exports.deleteAll = async (req, res) => {
    await UserModel.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} user were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all user."
        });
      });
  };