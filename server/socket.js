module.exports = function (io) {

  ioData = {
    usersConnected : []
  }

  io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
      for (let i = 0; i < ioData.usersConnected.length; i++) {
        if (ioData.usersConnected[i].socketId == socket.id) {
          ioData.usersConnected.splice(i,1);
        }
      }
      io.emit('user_did_disconnect', socket.id);
    });

    socket.on('user_login', (username) => {
      userToAdd = {
        'socketId' : socket.id,
        'username' : username
      }
      ioData.usersConnected.push(userToAdd);
      data = {
        'alreadyConnectedUsers' : ioData.usersConnected
      }
      io.emit('user_did_login', data);
    });
});
}