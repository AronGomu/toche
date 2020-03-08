module.exports = function (app) {

  var fs = require('fs'); // File writer

	// defining const & global variables 
  const paths = {
    usersFile : 'data/users/users.json',
  }
  
  // API
  
  // Save deck, will delete the old file even witth different name
  /*
  app.post('/login', function(req, res) {
        
    let data = {
      message: "No users found",
      is_valid: false,
      username_is_valid: false,
    }

    if (req.body.username== null || req.body.password == null) {
      data.message = "Username"
      return res.status(200).send(data);
    }

    let users = JSON.parse(fs.readFileSync(paths.usersFile, 'utf8'));

    for (let i = 0; i < users.length; i++) {
      if (users[i].username == req.body.username && users[i].password == req.body.password) {
        data.message = "Connection established";
        data.is_valid = true;
        data.username_is_valid = true;
        return res.status(200).send(data);
      }   
    }

    // No users found, try to find if it's username or password that is false
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == req.body.username) {
        data.message = "Username found, password seems incorrect";
        data.username_is_valid = true;
        return res.status(200).send(data);
      }   
    }
  
    return res.status(200).send(data);
  });
  */
	/*
	app.post('/register', function(req, res) {

		data = { is_valid: false };

		if (req.body.username == null || req.body.password == null) {
      return res.status(200).send(data);
		}
		
		let users = JSON.parse(fs.readFileSync(paths.usersFile, 'utf8'));
		
		newUser = {
			username: req.body.username,
			password: req.body.password
		}

		users.push(newUser);

		fs.writeFile(paths.usersFile,JSON.stringify(users), function(err) {
			if (err) {
					console.error(err);
					return res.status(200).send(data);
			}
		})

		data.is_valid = true;
		return res.status(200).send(data);

  });
  */
}