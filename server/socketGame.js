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
			//console.log("lastReceivedEmitData is null");
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
	'Spikey & Johnson game'
	ioData.socket.on("setSocketId", (data) => {
		io.to(ioData.socket.id).emit('setSocketId', ioData.socket.id);
		ioData.socket.join(data.gameInfo.socketRoomName);
		//console.log(ioData.socket.adapter.rooms[data.gameInfo.socketRoomName]);
	});

	// When both player trigger this, setup game server side
	ioData.socket.on("initializeGame", (data) => {
		console.log("\nReceive initializeGame");//console.log(data);console.log("");
		//console.log("ioData.socket.id");console.log(ioData.socket.id);
		if (verifySynchronicity(data) == true) {
			//console.log("verifySynchronicity is true");
			gameManager = new GameManager(data, data.myDeck, initializeGameFirstPlayerData[data.gameInfo.socketRoomName].myDeck);
			gameManager.initializeGame();
			//console.log(ioData.socket.adapter.rooms[data.gameInfo.socketRoomName]);
			io.to(data.gameInfo.socketRoomName).emit('initializeGame', ioData.socket.id);
		} else {
			//console.log("verifySynchronicity is false");
			if (initializeGameFirstPlayerData[data.gameInfo.socketRoomName] == null) {
				initializeGameFirstPlayerData[data.gameInfo.socketRoomName] = data;
			} 
		}
	});

	// Fetch gameState
	ioData.socket.on("fetchGameState", (data) => {
		console.log("\nReceive fetchGameState");//console.log(data);console.log("");
		//console.log("ioData.socket.id");console.log(ioData.socket.id);
		io.to(data.myself.socketId).emit("fetchGameState",gameManager.getGameState(data.myself.username));
		
	});
  
}