module.exports = function (io) {
  io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('my message', (msg) => {
      console.log('message: ' + msg);
    });
});
}