
module.exports = function (io, ioData) {

  setUserIsInGameByName = function(name, isInGame) {
    ioData.connectedUserlist.forEach(user => {
      console.log(user.username + " & " + name);
      if (user.username == name) {
        console.log("Result getUserByNameFromConnectedUserlist");
        console.log(user);
        user.isInGame = isInGame;
      }
    });
  }

    ioData.socket.on('refreshConnectedUserList', () => {
      console.log("Receive refreshConnectedUserList");console.log(data);console.log("");
      data = { 'userlist': ioData.connectedUserlist };
      io.emit('refreshConnectedUserList', data);
    });

    ioData.socket.on('askChallenge', (data) => {
      console.log("Receive askChallenge");console.log(data);console.log("");
      io.to(data.userAsked.socketId).emit('gotChallengeProposition', data);
    });

    ioData.socket.on('acceptChallenge', (data) => {
      console.log("Receive acceptChallenge");console.log(data);console.log("");
      if (data.accept == true) {
        setUserIsInGameByName(data.userAsked.username,true);
        setUserIsInGameByName(data.userAsking.username,true);
        io.emit('updateConnectedUserList', data);
      }
      io.to(data.userAsking.socketId).emit('challengePropositionResponse', data);
    });

    ioData.socket.on('joinRoom', (data) => {
      console.log("Receive joinRoom");console.log(data);console.log("");
      ioData.socket.join(data.socketRoomName);
      io.to(data.roomJoiner.socketId).emit('joinRoom', data);
    });

    ioData.socket.on('roomJoined', (socketRoomName) => {
      console.log("Receive roomJoined");console.log(data);console.log("");
      ioData.socket.join(socketRoomName);
    });

    ioData.socket.on('changeReady', (data) => {
      console.log("Receive changeReady");console.log(data);console.log("");
      io.to(data.gameInfo.roomCreator.socketId).emit('changeReady', data);
    })

    ioData.socket.on('startGame', (data) => {
      console.log("Receive startGame");console.log(data);console.log("");
      io.to(data.gameInfo.socketRoomName).emit('startGame', data);
    })
}