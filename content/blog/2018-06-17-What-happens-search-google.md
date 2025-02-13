---
title: Browser에서 Google.com을 검색하면 무슨 일이 발생하나요?
tags:
  - Web
date: 2018-06-17
aliases: 
  - ../articles/2018-06/What-happens-search-google
---

![[Assets/logo/web.jpg]]

## 들어가며
> 예전에 받았던 면접 질문들을 회고하고 보다 깊이 있게 이해하기 위해 정리합니다.

# Browser에서 Google.com을 검색하면 무슨 일이 발생하나요?

## 1. DNS에서 IP주소 가져오기
- `https://www.google.com`을 IP주소로 변환하는 작업이 필요합니다.

### Browser DNS Cache - Chrome
- 브라우저는 도메인이 캐시에 들어있는지 확인합니다.
- `chrome://net-internals/#dns`

![[Assets/posts/20180617/1.png]]

### OS DNS Cache - Mac
- 만약 Browser Cache에서 못 찾으면, OS에 저장된 DNS Cache를 찾게 됩니다.
- 각 OS의 hosts 위치 : [Link](https://en.wikipedia.org/wiki/Hosts_%28file%29#Location_in_the_file_system)
- Mac : `/etc/hosts`

![[Assets/posts/20180617/2.png]]

### Router DNS Server
- 만약 OS Cache에서도 못 찾으면, Router DNS Server에 직접 조회를 진행하게 됩니다.
- 현재 접속한 NameServer 주소
- Mac : `/etc/resolv.conf`

![[Assets/posts/20180617/3.png]]

### DNS Server
- Router DNS Server에 조회해서 없다면, Root DNS부터 조회를 하여 결과를 가져옵니다.
- Root DNS부터 Recursive Query를 진행하게 됩니다.
![[Assets/posts/20180617/4.png]]

## 2. Server와 TCP Socket 열기
- Server의 IP주소로 TCP Socket을 열어 Server와 통신 준비를 진행합니다.

### TCP 3 Way-Handshake
1. Client > Server : TCP SYN
2. Server > Client : TCP SYN ACK
3. Client > Server : TCP ACK

![[Assets/posts/20180617/5.png]]

### TCP Socket 연결 상태 확인하기
> $ netstat

![[Assets/posts/20180617/6.png]]


## 3. Server에 HTTP로 Resource 요청하기
- TCP Socket을 통해 HTTP Protocol로 원하는 Resource를 요청합니다.

### Flow
1. Client > Server : Request
2. Server > Client : Response

- HTTP 내용 : [Link](https://developer.mozilla.org/ko/docs/Web/HTTP)

### Client Request

![[Assets/posts/20180617/7.png]]

### Server Response

![[Assets/posts/20180617/8.png]]

## 4. Browser Page Rendering
- Server에서 받은 Resource를 Browser에서 Rendering하는 작업이 필요합니다.
- 잘 정리해 놓은 Link남겨드립니다. : [Link](https://d2.naver.com/helloworld/59361)



## Reference
- <https://github.com/alex/what-happens-when>
- <https://www.netmanias.com/ko/post/blog/5353/dns/dns-basic-operation>
- <https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a>
- <http://mindnet.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-22%ED%8E%B8-TCP-3-WayHandshake-4-WayHandshake>
