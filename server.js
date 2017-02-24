const express = require('express')
const app = express()
const path = require('path')
// const http = require('http').Server(app)
// const io = require('socket.io').listen(http);

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/src'));

// io.on('connection', function(socket){
//   console.log('connection')
//   socket.on('butts', function(butts){
//     console.log(butts);
//   })
// })

app.listen(process.env.PORT || 8000);