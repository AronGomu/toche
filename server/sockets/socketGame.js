const Game = require('../game.src/game.js');

var game;

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


/// TEMP ///
socketIdsyUsers = {}

///////////////////////////
///////// SOCKETS /////////
///////////////////////////

module.exports = function (io, ioData) {
	ioData.socket.on("setSocketId", (data) => {
		//console.log("setSocketId");
		let dataToReturn = {
			"mySocketId": null,
			"oppSocketId": null,
		};

		socketIdsyUsers[data.myself.username] = ioData.socket.id;
		dataToReturn.mySocketId = ioData.socket.id;
		if (socketIdsyUsers[data.opponent.username]) {
			dataToReturn.oppSocketId = socketIdsyUsers[data.opponent.username];
		}
		io.to(ioData.socket.id).emit('setSocketId', dataToReturn);
		ioData.socket.join(data.gameInfo.socketRoomName);
	});

	ioData.socket.on("setOppSocketId", (data) => {
		//console.log("setOppSocketId");
		console.log(data);
		console.log(socketIdsyUsers);
		console.log("ioData.socket.id : " + ioData.socket.id);
		console.log("data.opponent.socketId : " + data.opponent.socketId);
		io.to(data.opponent.socketId).emit('setOppSocketIdReceiver', {"oppSocketId": data.myself.socketId});
		socketIdsyUsers = {};
	});

	// When both player trigger this, setup game server side
	ioData.socket.on("initializeGame", (data) => {
		//console.log("\nReceive initializeGame");
		if (verifySynchronicity(data) == true) {
			game = new Game(data, data.myDecks, initializeGameFirstPlayerData[data.gameInfo.socketRoomName].myDecks);
			game.initializeGame();
			io.to(data.gameInfo.socketRoomName).emit('initializeGameReceiver', ioData.socket.id);
		} else {
			if (initializeGameFirstPlayerData[data.gameInfo.socketRoomName] == null) {
				initializeGameFirstPlayerData[data.gameInfo.socketRoomName] = data;
			} 
		}
	});

	// Fetch gameState
	ioData.socket.on("fetchGameState", (data) => {
		console.log("\nReceive fetchGameState");//console.log(data);console.log("");
		io.to(data.myself.socketId).emit("fetchGameStateReceiver",game.fetchGameState(data.myself.username));
	});

	// Fetch gameState then launch function paycost client side
	ioData.socket.on("fetchGameStateToPayCost", (data) => {
		console.log("\nReceive fetchGameStateToPayCost");//console.log(data);console.log("");
		io.to(data.myself.socketId).emit("fetchGameStateToPayCostReceiver",game.fetchGameState(data.myself.username));
	});

	// Player clicked pass button
	ioData.socket.on("passPriority", (data) => {
		//console.log("\nReceive passPriority");console.log(data);console.log("");
		game.passPriority(data.myself.username);
		io.to(data.gameInfo.socketRoomName).emit("passPriorityReceiver",null);
	});

	// Player clicked pass turn button
	ioData.socket.on("passTurn", (data) => {
		//console.log("\nReceive passPriority");console.log(data);console.log("");
		let phase = game.receivePassTurn(data.myself.username);
		console.log(phase);
		io.to(data.gameInfo.socketRoomName).emit("passPriorityReceiver",null);
	});

	// Player clicked on a playable card
	ioData.socket.on("playCard", (data) => {
		console.log("\nReceive passPriority");console.log(data);console.log("");
		let dataToReturn = game.playCard(data.myself.username, data.inGameIdInt);
		console.log(dataToReturn);
		if (dataToReturn != null) {
			io.to(data.myself.socketId).emit("playCardReceiver", dataToReturn);
		} else {
			io.to(data.myself.socketId).emit("resolvePayCostReceiver", game.resolveCardWithNoCost(data.myself.username, data.inGameIdInt));

		}
	});

	// Player selected all cards to pay cost
	ioData.socket.on("payCost", (data) => {
		console.log("\nReceive cardsSelected");console.log(data);console.log("");
		console.log(data.costsCompleted);
		io.to(data.myself.socketId).emit("resolvePayCostReceiver", game.resolveCard(data.costsCompleted));
	});
  
}