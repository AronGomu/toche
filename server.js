const express = require('express');
const http = require('http');

const app = express(); // Web server
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const bodyParser = require('body-parser'); // Allow parsing of received data
const cors = require('cors'); // Allow  connection between ports

app.use(bodyParser.json());
app.use(cors());

// import your routes
require('./server/decksManager.js')(app);
require('./server/auth.js')(app);
require('./server/sockets.js')(io)

const PORT = 3000;

server.listen(PORT, function() {
    console.log("Server running on localhost:" + PORT);
})