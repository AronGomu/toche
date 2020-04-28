module.exports = function (app) {

	var fs = require('fs'); // File writer

	// defining const & global variables 
  const decks = {
    pathCardsJson: "server/data/cards/cards.json",
    pathDeck : "server/data/decks/",
    extansion: ".tdk",
    currentPath : "server/data/temp/current_deck.tdk"
  }
  
  // API

  // Load all cards
  app.post('/getCards', function(req, res) {

    let data = {
			cards: []
		}

		try {
			if (fs.existsSync(decks.currentPath)) {
          data.cards = JSON.parse(fs.readFileSync(decks.pathCardsJson, 'utf8'));
          res.status(200).send(data);
			}
		} catch(err) {
      console.error(err)
      res.status(200).send({message: err});
		}
  })
  
  // Load Current Deck and all decks saved
  app.post('/getDecks', function(req, res) {
  
		let currentDeck;
		try {
			if (fs.existsSync(decks.currentPath)) {
					currentDeck = JSON.parse(fs.readFileSync(decks.currentPath, 'utf8'));
			}
		} catch(err) {
			console.error(err)
		}
		
		let data = {
			'currentDeck': currentDeck,
			'decks': []
		}
		
		fs.readdir(decks.pathDeck, function(err, filenames) {
			filenames.forEach(function(filename) {
				deck = JSON.parse(fs.readFileSync(decks.pathDeck + filename, 'utf8'));
				data.decks.push(deck);
			});
			res.status(200).send(data);
			});
  })
  
  // Save deck, will delete the old file even witth different name
  app.post('/saveDeck', function(req, res) {
		
		req.body.selected = null;
  
    if (req.body.oldname != req.body.name && req.body.oldname != "" && req.body.oldname != null) {
      fs.unlinkSync(decks.pathDeck + req.body.oldname + decks.extansion);
    }
  
    req.body.oldname = req.body.name;
  
      // Save the deck as current Deck
      fs.writeFile(decks.currentPath,JSON.stringify(req.body), function(err) {
        if (err) {
            console.error(err);
        }
      })
  
      // Save the deck
      fs.writeFile(decks.pathDeck + req.body.name + decks.extansion, JSON.stringify(req.body), function(err) {
          if (err) {
              console.error(err);
          }
      })
  
      return res.status(200).send({"message": "Deck saved"});
  });
  
  // Delete Deck
  app.post('/deleteDeck', function(req, res) {
    nameDeck = req.body.name;
    fs.unlinkSync(decks.pathDeck + nameDeck + decks.extansion);
    return res.status(200).send({"message": "Deck deleted"});
  });

  // Set Current
  app.post('/setCurrent', function(req, res) {
    fs.writeFile(decks.currentPath,JSON.stringify(req.body), function(err) {
      if (err) {
          console.error(err);
      }
    })
    return res.status(200).send({"message": "Deck set as current"});
  })
}