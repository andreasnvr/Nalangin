var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:Hydralisk5800@localhost:5432/nalangin';
var db = pgp(connectionString);

// add query functions
module.exports = {
  getAllUser: getAllUser,
  checkLogin: checkLogin,
  signUp    : signUp,
};

function getAllUser(req, res, next) {
  db.any('select * from ws_user')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function checkLogin(param, callback) {
  var username = param.username
  var query = "SELECT * FROM ws_user WHERE username = '" + username + "'";

  db.one(query)
    .then(function (data) {
      return callback(null, data);
    })
    .catch(function (err) {
      return callback(err);
    });
}

function signUp(param, callback) {
  var username = param.username;
  var password = param.password;
  var name     = param.name;
  var gender   = param.gender;
  var birth    = param.birth;
  var values   = "'"+name+"',"+17+",'"+gender+"','"+username+"','"+password+"'"

  var query    = "INSERT INTO ws_user (name,age,sex,username,password) VALUES ("+values+")";

  db.query(query)
    .then(function (data) {
      return callback(null, data);
    })
    .catch(function (err) {
      return callback(err);
    });
}

/*

function createUser(req, res, next) {
  db.any('INSERT INTO ws_user from ws_user')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}*/