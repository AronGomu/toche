module.exports = function (io) {

  ioData = {
    usersConnected : []
  }

  getUserByName = function(name) {
    ioData.usersConnected.forEach(user => {
      if (user.username == name) {
        return user.socketId;
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
      userToAdd = {
        'socketId' : socket.id,
        'username' : username,
        'isNotMe' : null
      }

      ioData.usersConnected.push(userToAdd);

      io.emit('user_did_login', ioData.usersConnected);
    });

    socket.on('askChallenge', (data) => {
      console.log("Receive askChallenge");console.log(data);console.log("");
      io.to(data.userAsked.socketId).emit('gotChallengeProposition', data);
    });

    socket.on('acceptChallenge', (data) => {
      console.log("Receive acceptChallenge");console.log(data);console.log("");
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