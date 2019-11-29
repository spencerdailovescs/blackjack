// blackjackComp20
// Comp20Final

const express = require('express');

const app = express();
const nodemailer = require('nodemailer')

// serve files from the public directory
app.use(express.static('public'));

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

app.post("server.js", function(req, res) {
  console.log(req.body); // this will output "The data you want to send to your server"
  // var data = yourFunction();
  res.status(200).send(data); // the status 200 is the default one, but this is how you can simply change it
})

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


