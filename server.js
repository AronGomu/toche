const express = require('express'); // Web server
const bodyParser = require('body-parser'); // Allow parsing of received data
const cors = require('cors'); // Allow  connection between ports
var fs = require('fs'); // File writer

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors());

// batch of data tied to the server
const serverData = {
  decksPath : 'data/decks/',
  currentDeckPath : 'data/temp/current_deck.tdk'
}

// API

// Default
app.get('/', function(req, res) {
    res.send('Hello from server')
    console.log("working ?");
})

// Load Current Deck and all decks saved
app.get('/getDecks', function(req, res) {

	let currentDeck = {
		name: null,
		cards: []
	}
	try {
    	if (fs.existsSync(serverData.currentDeckPath)) {
			currentDeck = JSON.parse(fs.readFileSync(serverData.currentDeckPath, 'utf8'));
		}
    } catch(err) {
      console.error(err)
  }

    let data = {
      'currentDeck': currentDeck,
      'decks': []
    }

    fs.readdir(serverData.decksPath, function(err, filenames) {
        filenames.forEach(function(filename) {
            deck = {
                name: filename.replace('.tdk', ''),
                cards: [],
            }
            deck.cards = JSON.parse(fs.readFileSync(serverData.decksPath + filename, 'utf8'));
            data.decks.push(deck);
        });
        res.status(200).send(data);
    });
})

app.post('/saveDeck', function(req, res) {
    let nameDeck = req.body.name;
    let cardsList = req.body.cards;

    // Save the deck
    fs.writeFile("data/decks/" + nameDeck + ".tdk",JSON.stringify(cardsList), function(err) {
        if (err) {
            console.error(err);
        }
    })

    // Save the deck as current Deck
    let currentDeck = {
      name : nameDeck,
      cards: cardsList
    }
    fs.writeFile(serverData.currentDeckPath,JSON.stringify(currentDeck), function(err) {
      if (err) {
          console.error(err);
      }
    })

    return res.status(200).send({"message": "Deck saved"});
});

app.post('/deleteDeck', function(req, res) {
  nameDeck = req.body.name;
  fs.unlinkSync("data/decks/" + nameDeck + ".tdk");
  return res.status(200).send({"message": "Deck deleted"});

  //return res.send(req.body);
});

app.listen(PORT, function() {
    console.log("Server running on localhost:" + PORT);
})