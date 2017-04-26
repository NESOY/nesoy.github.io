---
layout: post
title: Nodejs의 Tcp, Udp
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript]
date: 2017-04-27
---

![No Image](/assets/20170413/1.PNG)

## TCP Module
- `var net = require('net');`

### 클래스
- `net.Server`
- `net.Socket`

### 서버 생성
- `var server = net.createServer(option)`
- `server.listen(port)`
- `server.close()`
- `server.getConnections(callback)` : 연결갯수
- `server.address()` : 서버 주소

### Server Event
- `listening` : 포트 바인딩, 접속 가능한 상태 이벤트
- `connection` : 클라이언트 접속 이벤트
- `close` : 서버 닫기(연결된 소켓이 없을 때만 발생)
- `error` : 에러

``` javascript
var net = require('net');
var server = net.createServer(function(socket) {
    // connection event
    console.log('클라이언트 접속');
    socket.write('Welcome to Socket Server');

    socket.on('data', function(chunk) {
        console.log('클라이언트가 보냄 : ',
        chunk.toString());
    });

    socket.on('end', function() {
        console.log('클라이언트 접속 종료');
    });
});

server.on('listening', function() {
    console.log('Server is listening');
});

server.on('close', function() {
    console.log('Server closed');
});

server.listen(3000);
```

### Client event
- `connect` : 소켓 연결 이벤트
- `data` : 읽을 수 있는 데이터 도착
- `end` : 소켓 종료
- `timeout` : 제한 시간 지남
- `error` : 에러

``` javascript
var net = require('net');

var ip = '127.0.0.1';
var port = 3000;

var socket = new net.Socket();
socket.connect({host:ip, port:port}, function() {
   console.log('서버와 연결 성공');

   socket.write('Hello Socket Server\n');
   socket.end();

    socket.on('data', function(chunk) {
        console.log('서버가 보냄 : ',
        chunk.toString());        
    });

    socket.on('end', function() {
        console.log('서버 연결 종료');
    });
});
```

## Udp
- `require('dgram')`
- `dgram.Socket`

### event
- `listening` : 데이터 도착 감시
- `message` : 데이터 도착 이벤트
- `close` : 소켓 연결 종료 이벤트
- `error` : 에러 발생 이벤트

### Send

``` javascript
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var msg = new Buffer('Hello UDP Receiver');
socket.send(msg, 0, msg.length, 3000, '127.0.0.1',
    function(err) {
        console.log(err);
        if ( err ) {
            console.log('UDP message send error', err);
            return;
        }
        console.log('메세지 전송 성공');
        socket.close();        
    }
);
```

### Receive

``` javascript
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
socket.bind(3000);

socket.on('listening', function() {
    console.log('listening event');
});

socket.on('message', function(msg, rinfo) {
    console.log('메세지 도착', rinfo.address, msg.toString());
});

socket.on('close', function() {
    console.log('close event');
});
```

### Multicast
- `socket.addMembership`
