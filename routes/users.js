var express = require('express');
var router 	= express.Router();
var db 	   	= require('../queries');
var bcrypt 	= require('bcrypt');
var state 	= require('../private_modules/state');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/get_all_users', db.getAllUser);

/* Login Verification. */
router.post('/login', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password
	var responseJson;

	responseJson = {
		"success" 	: false,
		"data"	   	: {
						"username" : req.body.username
					}
	}
	

	if (username == "" || password == "" || username == undefined || password == undefined){
		res.json(responseJson);
		return;
	}

	var hash;

	db.checkLogin({username : username}, function (err, data) {
		if (err) {
		  	res.json(responseJson);
		  	return;
		}

		hash = data.password;
		comparePassword(password , hash , function(err, isPasswordMatch){
			if (!err && isPasswordMatch) {
				responseJson.success 		= true 
				responseJson.data.id 		= data.id
				responseJson.data.username  = data.username
				responseJson.data.name 		= data.name
				responseJson.data.email 	= data.email
				responseJson.data.sex 		= data.sex
				responseJson.data.age 		= data.age
				responseJson.data.password  = data.password
				var profpicURL 				= state.getProfpicURL(data.username)
				responseJson.data.profpicURL= profpicURL
			}

	  		res.json(responseJson);
	  		return;
		})
	});
});

router.post('/signup', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var name 	 = req.body.name;
	var gender 	 = req.body.gender;
	var birth 	 = req.body.birth;

	var signupData = {
		username : username,
		name     : name,
		gender   : 'F',
		birth	 : '1993-04-05'
	};

	var responseJson;

	responseJson = {
		"success" 	: false,
	}

	cryptPassword(password, function(err, hash){
		if (err) {
			res.json(responseJson);
			return;
		}	
		signupData.password = hash;
		console.log(signupData.password )

		registerToDB(signupData, function(err){
			if (err) {
			  	res.json(responseJson);
			  	return;
			}

			responseJson.success = true 
		  	res.json(responseJson);
		  	return;
		});
	});
});

var registerToDB = function (signupData, callback) {
	db.signUp(signupData, function (err) {
		if (err) {
		  	return callback(err);
		}

		return callback(null);
	});
};


var cryptPassword = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });

  });
};

var comparePassword = function(password, userPassword, callback) {
   bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
      if (err) 
        return callback(err);
      return callback(null, isPasswordMatch);
   });
};

module.exports = router;
