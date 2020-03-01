module.exports = function (app) {

	var fs = require('fs'); // File writer

	// defining const & global variables 
  const decks = {
    path : 'data/decks/',
    extansion: '.tdk',
    currentPath : 'data/temp/current_deck.tdk'
  }
  
  // API
  
  // Load Current Deck and all decks saved
  app.get('/getDecks', function(req, res) {
  
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
		
		fs.readdir(decks.path, function(err, filenames) {
			filenames.forEach(function(filename) {
				deck = JSON.parse(fs.readFileSync(decks.path + filename, 'utf8'));
				data.decks.push(deck);
			});
			res.status(200).send(data);
			});
  })
  
  // Save deck, will delete the old file even witth different name
  app.post('/saveDeck', function(req, res) {
		
		req.body.selected = null;
  
    if (req.body.oldname != req.body.name && req.body.oldname != "" && req.body.oldname != null) {
      fs.unlinkSync(decks.path + req.body.oldname + decks.extansion);
    }
  
    req.body.oldname = req.body.name;
  
      // Save the deck as current Deck
      fs.writeFile(decks.currentPath,JSON.stringify(req.body), function(err) {
        if (err) {
            console.error(err);
        }
      })
  
      // Save the deck
      fs.writeFile(decks.path + req.body.name + decks.extansion, JSON.stringify(req.body), function(err) {
          if (err) {
              console.error(err);
          }
      })
  
      return res.status(200).send({"message": "Deck saved"});
  });
  
  // Delete Deck
  app.post('/deleteDeck', function(req, res) {
    nameDeck = req.body.name;
    fs.unlinkSync(decks.path + nameDeck + decks.extansion);
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