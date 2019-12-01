// blackjackComp20@gmail.com
// Comp20Final

//IF it ever breaks and says "CANT POST /GAME" text Will. It's not a problem.
//	it just means i missed something earlier
// app.post("/game", function(req, res) {
//   const form = JSON.parse(JSON.stringify(req.body))
//   console.log(form)
//   res.status(200).sendFile(__dirname + '/public/game.html')
// })

/*                              Setup
//----------------------------------------------------------------------------\\
*/

const express = require('express');
const app = express();
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const hasher = require('./hash')
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.listen(8080, () => {
  console.log('listening on 8080');
});

//Serves homepage (also fits under GET requests)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/*                              GET requests
//----------------------------------------------------------------------------\\
*/


app.get('/game', (req, res) => {
	res.sendFile(__dirname + '/public/game.html');
})

app.get('/to_newUser', (req, res) => {
	res.sendFile(__dirname + '/public/create_user.html');
})

app.get('/to_fgtPass', (req, res) => {
	res.sendFile(__dirname + '/public/forgot_pass.html');
})


app.post('/createUser', function(req, res) {
    const user = JSON.parse(JSON.stringify(req.body))
    console.log("User: " + user.Username)
    console.log("Email: " + user.email)
    username = user.Username
    email = user.email
    var name_bool = unique_name_check(username)
    var email_bool = unique_email_check(email)
    if (!name_bool || !email_bool) {
  	   res.status(200).sendFile(__dirname + '/public/create_user_fail.html')
    }
    else{
	  var pass = gen_random_pass(username+email)
	  add_user_toDB(username, email, pass);
	  console.log("Password (generated): " + pass)
	  send_password(pass, email)
	  res.status(200).sendFile(__dirname + '/public/create_user_succ.html')
}

})

/*                              POST requests
//----------------------------------------------------------------------------\\
*/
app.post('/fgtPass', function(req, res) {
  const email = JSON.parse(JSON.stringify(req.body)).Email
  var pass = get_password(email)
  if (pass === -1) {
  	res.status(200).sendFile(__dirname + '/public/forgot_pass_fail.html')
  }
  else {
    send_password(pass, email)
    res.status(200).sendFile(__dirname + '/public/forgot_pass_succ.html')
  }

})

app.post("/login", function(req, res) {
  const user = JSON.parse(JSON.stringify(req.body))
  console.log(user)
  if (check_login(user.username, user.passwd)) {
     res.status(200).sendFile(__dirname + '/public/game.html')
  }
  else {
  	res.status(200).sendFile(__dirname + '/public/login_fail.html')
  }
})



/*                            Misc. Helpers
//----------------------------------------------------------------------------\\
*/
function gen_random_pass(text) {
	var pass = hasher(text)
	if (unique_pass_check(pass)){
		return pass
	}
	gen_random_pass(pass)
}

function send_password(pass, email) {
	var transporter = nodemailer.createTransport({
 	service: 'gmail',
 	auth: {
        user: 'blackjackComp20@gmail.com',
        pass: 'Comp20Final'
    }
	});

	const mailOptions = {
	  from: 'blackjackComp20@gmail.com', // sender address
	  to: email, // list of receivers
	  subject: 'Your Blackjack Password!', // Subject line
	  html: '<p>Here is your password:  ' + pass + '</p> <p>Always play responsibly.</p><p>Best of luck,</p> <p>The BlackJack Team</p>'
	};

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});

}

/*                              Database Stuff
//----------------------------------------------------------------------------\\
*/

//the login function: Makes sure username and password are correct
function check_login(user, pass) {
	//checks to make sure the value associated with key "user" is "pass"
	//(obviously this will depend on database structure. if you have 
	// (email, pass) and (user, pass) key value pairs in the database the user
	// could use either email or username to log in.)
	// if the value associated with key user is pass, then return true
	// else return false
	return true;
}


//a getter function: Uses email as a key to get a password from the database.
// (allows forgotten password functionality)
function get_password(email) {
	//checks database for password associated with email
	//if the email password key value pair exists, return the password
	//else, return -1
	return "Placeholder";
}


//Adds a user to the database by adding two key value pairs (user, pass) (email, pass)
function add_user_toDB(user, email, pass) {
	//add the key value pairs however makes sense
	//
	//probably two?:
	// (user, pass)
	// (email, pass)
	// (that way we can do forgotten password / login with email or username)
	//
	//no return value
}

//checks if password is unused *Optional*
function unique_pass_check(pass) {
	// Checks database for pass,
	// returns true if the pass is not in the database,
	// else returns false
	//Note: if this is too hard no worries, as long as we are using unique 
    //username and emails too so it should 
	//be ok
	return true
}

//checks if username is unused
function unique_name_check(username) {
	// Checks database for username,
	// returns true if the username is not in the database,
	// else returns false
	return true;
}

//checks if email is unused.
function unique_email_check(email) {
	// Checks database for email,
	// returns true if the email is not in the database,
	// else returns false
	return false;
}

