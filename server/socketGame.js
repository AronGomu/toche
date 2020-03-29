const GameManager = require('./game.src/gameManager.js');

var gameManager;

var lastReceivedEmitData = {
	"max & dad game": null,
	"death & humanity game": null
};

var initializeGameFirstPlayerData = {};

function verifySynchronicity(data) {
	if (lastReceivedEmitData[data.gameInfo.socketRoomName] == null) {
		lastReceivedEmitData[data.gameInfo.socketRoomName] = data;
		return false;
	} else {
		if (data.opponent.username == lastReceivedEmitData[data.gameInfo.socketRoomName].myself.username) {
			lastReceivedEmitData = null;
			console.log("lastReceivedEmitData is null");
			return true;
		} else {
			return false;
		}
	}
};


///////////////////////////
///////// SOCKETS /////////
///////////////////////////

module.exports = function (io, ioData) {

	// When both player trigger this, setup game server side
	ioData.socket.on("initializeGame", (data) => {
		console.log("Receive initializeGame");console.log(data);console.log("");
		if (verifySynchronicity(data) == true) {
			console.log("verifySynchronicity is true");
			//console.log(initializeGameFirstPlayerData[data.gameInfo.socketRoomName].deck.cards);
			//console.log(data.deck.cards);
			gameManager = new GameManager(data.myself, data.opponent);

			//io.to().emit("initializeGame");
		} else {
			console.log("verifySynchronicity is false");
			if (initializeGameFirstPlayerData[data.gameInfo.socketRoomName] == null) {
				initializeGameFirstPlayerData[data.gameInfo.socketRoomName] = data;
			} 
		}
	});
  
}