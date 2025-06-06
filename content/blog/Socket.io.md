---
aliases: [/articles/2017-04/Socket.io]
comments: false
date: 2017-04-28
description: 
tags: [NodeJs]
title: Socket.io
---
# Socket.io
- 호환되는 기술 자동 선택 ex) websocket, ajax, polling
- `npm install socket.io`

## Socket.io 서버 생성
- `var Server = require('socket.io')`
- `var io = new Server(httpServer);`
- 축약버젼 : `var io = require('socket.io')(server)`
## Event
- `connection`

``` javascript
var express = require('express');
var http = require('http');
var app = express();

var server = http.createServer(app);
server.listen(3000);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client.html');
});

var io = require('socket.io')(server);
io.on('connect', function(socket) {
   console.log('클라이언트 접속');

   socket.on('disconnect', function() {
      console.log('클라이언트 접속 종료');
   });
    setInterval(function(){
       socket.emit('message', '메세지');
   }, 3000);

});
```

# Socket.io Client
- `<script src="/socket.io/socket.io.js"></script>`
- `var socket = io();`

``` javascript
<script src="/socket.io/socket.io.js"></script>
<script>
    var socket = io();

    socket.on('connect', function() {
       console.log('서버와 연결');
    });    

</script>
```

## Event
- `connect`
- `error`
- `disconnect`
- `reconnect` : 자동 재접속 시도

# 데이터 교환
- `socket.emit('Event', data);` : 전송
- `socket.on('Event',function(data))` : 수신

- Server

``` javascript
  socket.emit('message', '메세지');
```

- Client

``` javascript
socket.on('message', function(msg) {
    document.writeln('<li>');
    document.writeln(msg);
    document.writeln('</li>');
});
```

## BroadcaseEvent
- `socket.io.emit('BroadcaseEvent',data)`
- `io.emit('BroadcaseEvent',data)` : socket 생략 가능

# Namespace & Room
- 같은 Namespace에서만 메시지 주고 받음
- Default-Namespace : `/`

## Namespace Setting
- `var nsp = io.of('/Custom-Namespace');` : Server
- `var nsp = io('/Custom-Namespace');` : Client

- Server

``` javascript
var io = require('socket.io')(server);
var system = io.of('/system');
system.on('connect', function(socket) {
   console.log('클라이언트 접속');
});
system.emit('message','Notice!');
```

- Client

``` javascript
var socket = io();
var system = io.of('http://nelp.kr/system');
system.on('connect', function(socket) {
   console.log('클라이언트 접속');
});
system.on('message', function(data){
  alert('System Message' + data);
});
```

## Room
- Namespace 내 채널
- 같은 Room에서만 데이터 교환
- 룸에 입장(join), 여러 룸에 입장 가능
- 룸에서 떠나기(leave)

- Server

``` javascript
var room;

socket.on('joinRoom',function(data){
    // 기존 방에서 나오기
    socket.leave(room);

    // 새로운 채팅방 입장
    room = data.room;
    socket.join(room);
});
// 채팅 메시지, 룸으로(to) 전송
socket.on('chatinput',function(data){
  io.to(room).emit('chatMessage',chat);
});
```

- Client

``` javascript
// 룸에 입장
socket.emit('joinRoom', {room:room});
// 채팅 메시지, 룸으로(to) 전송
socket.on('chatMessage',function(data){
  var msg = data['msg'];
  var nick = data['nick'];
  var str = nick + ' : ' + msg;

  $('#messages').append($'<li>').text(str);
});
```
