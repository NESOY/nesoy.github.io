---
aliases: [/articles/2018-10/TCP]
comments: false
date: 2018-10-10
description: 
tags: [Network]
title: TCP에 대해
---
# TCP에 대해
## 들어가며
> 과거 면접 과정에서 받았던 TCP 질문에 대해 다시 회고하고 알게된 내용을 정리합니다.

## TCP(Transmission Control Protocol)란?
- 전송 계층(Transport Layer)에서 사용하는 Protocol.

### TCP는 무슨 기능이 있을까요?

#### 신뢰성이 높은 전송(Reliable transmission)
- Dupack-based retransmission
    - 정상적인 상황에서는 ACK 값이 연속적으로 전송되어야 합니다.
    - 그러나 ACK값이 중복으로 올 경우 패킷 이상을 감지하고 재전송을 요청합니다.
- Timeout-based retransmission
    - 일정시간동안 ACK 값이 수신을 못할 경우 재전송을 요청합니다.

#### 흐름 제어(Flow control)
- 데이터 처리 속도를 조절하여 수신자의 버퍼 오버플로우를 방지하는 것
- 수신자가 윈도우 값을 통해 수신량을 정할 수 있습니다.

#### 에러 감지(Error detection)
- 데이터 변형, 분실 오류를 방지
- Checksum을 활용하여 데이터 변형 감지합니다.

#### 혼잡 제어(Congestion control)
- 네트워크 내의 패킷 수가 넘치게 증가하지 않도록 방지하는 것
- 정보의 소통량이 과다하면 패킷을 조금만 전송하여 혼잡 붕괴 현상이 일어나는 것을 막는다.

### TCP Header에는 무엇이 있을까요?

![[assets/posts/20181010/1.png]]

- `Source port` / `Destination port`
- `Sequence number`
    - SYN = 1 : 초기 시퀀스 번호가 된다. ACK 번호는 이 값에 1을 더한 값
    - SYN = 0 : 현재 세션의 이 세그먼트 데이터의 최초 바이트 값의 누적 시퀀스 번호
- `Acknowledgment number`
    - ACK = 1 : 필드의 값은 수신자가 예상하는 다음 시퀀스 번호입니다.
- `Header Length`
    - 32-bit 워드 단위로 나타낸 TCP 헤더 크기값이다.
- `Reserved`
    - 미래에 사용하기 위해 남겨둔 예비 필드이며 0으로 채워져야 한다.
- `Flags`
    - NS : ECN-nonce 은폐 보호
    - CWR : 호스트가 ECE 플래그가 포함된 TCP 세그먼트를 수신했으며 혼잡 제어 메커니즘에 의해 응답했음을 알리는 역할.
    - ECE : ECN-Echo는 다음을 나타낸다.
        - SYN = 1 : TCP 상대가 명시적 혼잡 통지(Explicit Congestion Notification, ECN)가 가능함을 의미.
        - SYN = 0 : IP 헤더 셋에 혼잡 경험(Congestion Experienced) 플래그가 설정된 패킷이 정상적인 전송 중에 수신되었다는 것을 의미.
    - URG : Urgent pointer 필드의 값이 유효함을 나타냅니다.
    - ACK : 클라이언트가 보낸 최초의 SYN 패킷 이후에 전송되는 모든 패킷은 이 플래그가 설정되어야 합니다.
    - PSH : 수신 애플리케이션에 버퍼링된 데이터를 푸시해 줄지 여부를 물어보는 역할입니다.
    - RST : Connection Reset
    - SYN : 동기화 시퀀스 번호. 양쪽이 보낸 최초의 패킷에만 이 플래그가 설정되어 있어야 합니다.
    - FIN : 남은 송신측 데이터 없음
- `Window size`
    - 수신 윈도의 크기.
    - 0이면 송신 프로세스의 전송 중지.
- `Checksum`
    - 헤더 및 데이터의 에러 확인을 위해 사용되는 16 비트
- `Urgent pointer`
    - URG 플래그가 설정된 경우, 이 16 비트 필드는 시퀀스 번호로부터의 오프셋을 나타낸다. 이 오프셋이 마지막 긴급 데이터 바이트를 가리킨다.
- `Options`


### TCP Connection(3-way handshake) - Disconnection(4-way handshake)
![[assets/posts/20181010/2.png]]

#### TCP Connection(3-way handshake)
1. 먼저 open()을 실행한 클라이언트가 `SYN`을 보내고 `SYN_SENT` 상태로 대기한다.
2. 서버는 `SYN_RCVD` 상태로 바꾸고 `SYN`과 응답 `ACK`를 보낸다.
3. `SYN`과 응답 `ACK`을 받은 클라이언트는 `ESTABLISHED` 상태로 변경하고 서버에게 응답 `ACK`를 보낸다.
4. 응답 `ACK`를 받은 서버는 `ESTABLISHED` 상태로 변경한다.

#### TCP Disconnection(4-way handshake)
1. 먼저 close()를 실행한 클라이언트가 FIN을 보내고 `FIN_WAIT1` 상태로 대기한다.
2. 서버는 `CLOSE_WAIT`으로 바꾸고 응답 ACK를 전달한다. 동시에 해당 포트에 연결되어 있는 어플리케이션에게 close()를 요청한다.
3. ACK를 받은 클라이언트는 상태를 `FIN_WAIT2`로 변경한다.
4. close() 요청을 받은 서버 어플리케이션은 종료 프로세스를 진행하고 `FIN`을 클라이언트에 보내 `LAST_ACK` 상태로 바꾼다.
5. FIN을 받은 클라이언트는 ACK를 서버에 다시 전송하고 `TIME_WAIT`으로 상태를 바꾼다. `TIME_WAIT`에서 일정 시간이 지나면 `CLOSED`된다. ACK를 받은 서버도 포트를 `CLOSED`로 닫는다.

#### 주의해야 할 점.
- 반드시 서버만 `CLOSE_WAIT` 상태를 갖는 것은 아니다.
- 서버가 먼저 종료하겠다고 `FIN`을 보낼 수 있고, 이런 경우 서버가 `FIN_WAIT1` 상태가 됩니다.
- 누가 먼저 `close`를 요청하느냐에 따라 상태가 달라질 수 있다.

## TCP Question
### 한 개의 Server Socket에서 열 수 있는 최대 동시 연결 갯수는 65536개이다?
- 정답은 X입니다.
- 소켓은 protocol, source addr, source port, destination addr, destination port로 unique하게 구성됩니다.
- 소켓의 수는 설정된 `리눅스 파일 디스크립터`만큼 생성할 수 있습니다.

![[assets/posts/20181010/3.png]]

- [Java, max user processes, open files - 우아한 형제들](http://woowabros.github.io/experience/2018/04/17/linux-maxuserprocess-openfiles.html)

### TCP는 데이터 순서 보장을 위해 한 번에 하나의 Packet만 전송할까?
- 정답은 X입니다.
- 많은 데이터를 매번 ACK를 받고 보내기엔 너무 많은 Cost가 필요합니다.
- 위와 같은 문제를 해결하기 위해 Window라는 논리적인 패킷 묶음을 사용합니다.
    - 최소한의 ACK로 데이터 순서를 보장하며 전송을 할 수 있습니다.

### Tcp packet의 port number byte order는 big endian이다?
- 정답은 O입니다.
- 각각의 PC에서 데이터를 저장하는 방식이 Big endian, Little endian 두 가지 있습니다.
- 저장방식에 따라 데이터 해석 또한 달라지기 때문에 Network byte order의 표준이 필요했습니다.
    - Network byte order의 표준은 big endian입니다.
- Little endian을 사용하는 머신에서는 Big endian으로 변환하는 작업이 필요합니다.

- [IBM의 Network byte order](https://www.ibm.com/support/knowledgecenter/en/SSB27U_6.4.0/com.ibm.zvm.v640.kiml0/asonetw.htm)
- [Understanding Big and Little Endian Byte Order](https://betterexplained.com/articles/understanding-big-and-little-endian-byte-order/)


## Reference
- [CLOSE_WAIT & TIME_WAIT 최종 분석](http://tech.kakao.com/2016/04/21/closewait-timewait/)
- [TIME_WAIT 상태란 무엇인가](http://docs.likejazz.com/time-wait/)
- [CLOSE_WAIT 문제 해결](http://docs.likejazz.com/close-wait/)
- [TCP/IP 네트워크 스택 이해하기](https://d2.naver.com/helloworld/47667)
- [3G 모바일 네트워크의 이해](https://d2.naver.com/helloworld/111111)
- [리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 1편](https://meetup.toast.com/posts/53)
- [리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 2편](https://meetup.toast.com/posts/54)
- [리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 3편](https://meetup.toast.com/posts/55)
- [네트워크 TCP, 믿을 수 있나요!?](https://www.slideshare.net/bluem31/tcp-47441568?qid=04ddad59-7ebb-4557-99d7-50435e9a5f92&v=&b=&from_search=5)
- [How TCP/IP Works](https://technet.microsoft.com/pt-pt/library/cc786128(v=ws.10).aspx)
- <https://en.wikipedia.org/wiki/Transmission_Control_Protocol>
- <https://blog.naver.com/cestlavie_01/221190445329>
