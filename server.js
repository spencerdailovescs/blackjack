// blackjackComp20
// Comp20Final

const express = require('express');

const app = express();
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
// var router = express.Router();
// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
// app.use('/', router);


// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
	// console.log("ho")
  res.sendFile(__dirname + '/index.html');
  // var domain = req.headers.host
	// console.log(domain)
});


app.post("/game", function(req, res) {
  const form = JSON.parse(JSON.stringify(req.body))
  console.log(form)
 
res.status(200).sendFile(__dirname + '/public/game.html')
  // res.status(200).json(form);
  // res.write(__dirname + '/public/index.html')
   // res.sendFile(__dirname + 'public/index.html'); // the status 200 is the default one, but this is how you can simply change it
})

function parse_email(text) {
	whitespace_free = text.replace(/\s/g,'')
	i = text.split('"')
	return i[1]
}

// app.get('/', function(req,res) {

// })


//*********** node stuff
// const http = require('http');
// // require ('./app.js');
// const fs = require('fs')

// const hostname = '127.0.0.1';
// const port = 3000;

// fs.readFile('index.html', function(err,html) {
// 	if (err) {
// 		console.log("Error reading index.html")
// 		throw err;
// 	}
// 	http.createServer(function(req, res) {
// 		res.writeHeader(200, {"Content-Type" : "text/html"});
// 		res.write(html);
// 		res.end()
// 	}).listen(port)
// })



// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


