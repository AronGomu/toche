module.exports = function (io) {

  ioData = {
    usersConnected : []
  }

  getUserByName = function(name) {
    ioData.usersConnected.forEach(user => {
      console.log(user.username + " & " + name);
      if (user.username == name) {
        console.log("Result getUserByName");
        console.log(user);
        return user;
      }
    });
  }

  setUserisNotInGameByName = function(name, isNotInGame) {
    ioData.usersConnected.forEach(user => {
      console.log(user.username + " & " + name);
      if (user.username == name) {
        console.log("Result getUserByName");
        console.log(user);
        user.isNotInGame = isNotInGame;
      }
    });
  }

  io.on('connection', function(socket){
    
    socket.on('disconnect', () => {
      console.log("Receive disconnect from " + socket.id);
      for (let i = 0; i < ioData.usersConnected.length; i++) {
        if (ioData.usersConnected[i].socketId == socket.id) {
          ioData.usersConnected.splice(i,1);
        }
      }
      io.emit('user_did_disconnect', socket.id);
    });

    socket.on('user_login', (username) => {
      console.log("Receive user_login : " + username);
      console.log("\nAll Users logged in");
      console.log(ioData.usersConnected);
      console.log("\n");
      userToAdd = {
        'socketId' : socket.id,
        'username' : username,
        'isNotMe' : null,
        'isNotInGame' : true
      }
      ioData.usersConnected.push(userToAdd);
      data = { 'userlist': ioData.usersConnected, 'myself':userToAdd }
      io.emit('user_did_login', data);
    });

    socket.on('refreshConnectedUserList', () => {
      console.log("Receive refreshConnectedUserList");console.log(data);console.log("");
      data = { 'userlist': ioData.usersConnected };
      io.emit('refreshConnectedUserList', data);
    });

    socket.on('askChallenge', (data) => {
      console.log("Receive askChallenge");console.log(data);console.log("");
      io.to(data.userAsked.socketId).emit('gotChallengeProposition', data);
    });

    socket.on('acceptChallenge', (data) => {
      console.log("Receive acceptChallenge");console.log(data);console.log("");
      if (data.accept == true) {
        setUserisNotInGameByName(data.userAsked.username,false);
        setUserisNotInGameByName(data.userAsking.username,false);
        io.emit('updateConnectedUserList', data);
      }
      io.to(data.userAsking.socketId).emit('challengePropositionResponse', data);
    });

    socket.on('joinRoom', (data) => {
      console.log("Receive joinRoom");console.log(data);console.log("");
      socket.join(data.socketRoomName);
      io.to(data.roomJoiner.socketId).emit('joinRoom', data);
    });

    socket.on('roomJoined', (socketRoomName) => {
      socket.join(socketRoomName);
    });
});
}