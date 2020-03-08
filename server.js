const app = require('express')(); // Web server
const bodyParser = require('body-parser'); // Allow parsing of received data
const cors = require('cors'); // Allow  connection between ports

app.use(bodyParser.json());
app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

const PORT = 3000;

http.listen(PORT, function() {
    console.log("Server running on localhost:" + PORT);
})


// import your routes
require('./server/decksManager.js')(app);
require('./server/auth.js')(app);
require('./server/socket.js')(io)