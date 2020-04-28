module.exports = function (io) {

  var ioData = {
    'connectedUserlist' : [],
    'socket' : null,
  }

  io.on('connection', function(socket){
    console.log("Receive connect from " + socket.id);
    ioData.socket = socket;
    
    socket.on('disconnect', () => {
      console.log("Receive disconnect from " + socket.id);
      for (let i = 0; i < ioData.connectedUserlist.length; i++) {
        if (ioData.connectedUserlist[i].socketId == socket.id) {
          ioData.connectedUserlist.splice(i,1);
        }
      }
      io.emit('user_did_disconnect', socket.id);
    });

    socket.on('user_login', (username) => {
      console.log("Receive user_login : " + username);
      console.log("\nAll Users logged in");
      console.log(ioData.connectedUserlist);
      console.log("\n");
      userToAdd = {
        'socketId' : socket.id,
        'username' : username,
        'isMe' : null,
        'isInGame' : false
      }
      ioData.connectedUserlist.push(userToAdd);
      data = { 'userlist': ioData.connectedUserlist, 'myself':userToAdd }
      io.emit('user_did_login', data);
    });

    require('./sockets/socketMenus.js')(io,ioData);
    require('./sockets/socketGame.js')(io,ioData);

});
}
