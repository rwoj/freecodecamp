'use strict';
module.exports=function (io) {
  io.on('connection', function(socket){
    console.log('connection on!')
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('add symbol', function(msg) {
      // console.log('message jest:', msg);
      io.emit('add symbol', msg);
    })
    socket.on('remove symbol', function(msg) {
      // console.log('message jest:', msg);
      io.emit('remove symbol', msg);
    })
  })
}
