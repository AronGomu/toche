const express = require('express'); // Web server
const bodyParser = require('body-parser'); // Allow parsing of received data
const cors = require('cors'); // Allow  connection between ports

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.listen(PORT, function() {
    console.log("Server running on localhost:" + PORT);
})

// import your routes
require('./server/decksManager.js')(app);
require('./server/auth.js')(app);