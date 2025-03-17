---
title: Trouble Shooting에 대하여
tags:
  - Software Engineering
date: 2018-12-17
aliases: 
  - /articles/2018-12/Trouble-Shooting
---

## 들어가며
- 서버를 운영하면서 갑자기 문제가 발생하게 되는 경우 어느 부분부터 확인해야 좋을까?
    - 여러 부분을 체계적이지 않게 확인해왔던 지난 날을 회고하고,
    - 어느 부분부터 단계적으로 봐야하는지 좋은 가이드 글이 있어 공유하려 합니다.
    - 제가 직접 문제를 겪으며 확인해야 할 부분을 몇 가지 더 추가했습니다.

## How to Trouble Shooting?🧐
> Step A에서 C로 갈수록 취득 비용이 비싸집니다.

### Step A - 사용자 현상파악
- 503 / 500 ERROR ?
- 무응답 / 느린 응답 ?
- 예상과는 다른 Application 동작
    - Ex) 간헐적 인증 실패

### Step B - 서버 상태 파악
- Application Server
    - CPU 사용률
    - Memory 사용률(Swap 사용여부)
    - Disk 용량, I/O
    - Network : Inbound, OutBound
- 연계서버 상태 (Database 서버, Cache 서버)
    - CPU 사용률
    - Memory 사용률(Swap 사용여부)
    - Disk 용량, I/O
    - Network : Inbound, OutBound

### Step C - Application의 정보 파악
- Application Server Log
    - OOM(Out of Memory)등 전형적인 Fatal 여러 발생 여부
    - 자주 발생하는 에러 스택
- 연계 Server Log
    - 추가적으로 연계 서버에서만 확인가능한 Metric 확인
    - Ex) [Elastic Search(Reject Exception)](https://brunch.co.kr/@alden/36)
- 변경된 소스코드
- WAS의 주요 설정
    - [Tomcat Configuration](https://www.mulesoft.com/tcat/tomcat-configuration)
- Web Server의 주요 설정
    - [NGINX Configuration](https://www.nginx.com/resources/wiki/start/topics/examples/full/)
- [GC Option & Log](https://www.slipp.net/wiki/pages/viewpage.action?pageId=26641949)
- Thread Stack Dump
- Heap Dump
- 실행경로 프로파일링


### 대부분 이런 문제의 공통점은..?
- 개발환경에서는 괜찮았어요.
- 운영환경에서도 평소에는 괜찮았어요.
- 하지만?
    - 문제가 불규칙적으로 발생하네요.
    - 부하가 몰리면 이상해져요.

### 수준 높은 지원 요청은 어떻게 하는 것인가?
- `추론 과정과 증거까지 공유`
- 스스로 생각하는 해결 방식이 있지만, 더 나은 방식을 찾기 위해 문의하는 것.
    - 해결 방식에 대한 부작용 여부 확인
    - 다른 부서의 유사 사례 문의
- 사실 최고의 지원 요청은 요청하지 않는 것.
    - 알아서 해결하고, 과정과 배경 정보까지 다 정리해서 다른 부서에도 공유하는 것.

### 문제에 대한 정보는 어떻게 제공해야 할까?
- 해당 증상 재현 조건
- 사용자에게 항상 / 간헐적으로 나타나는지?
- 일부 / 전체 서버에 나타나는지..?
    - 전체 서버 : `공통 자원과 설정`
    - 일부 서버 : `Thread 안정성 문제`를 먼저 의심

## Example - 인프라 요소 설정 문제
### Problem Description
- Step A
    - 사용자가 몰릴 시 간헐적 느린 응답
    - 500, 503 ERROR
- Step B
    - Swapping 영역 사용.
- Step C
    - 잦은 GC, OOM, Connection Pool의 getConnection()에서 대기
- 데이터베이스등 공용 외부 자원에서 병목이 있을 때 부적절한 설정 때문에 상태를 악화시키거나 방어하지 못하는 경우가 많습니다.
- 모든 서버에서 같은 현상이 발생하기 쉽습니다.

### How to solve?
- ConnectionPool
    - DBCP : maxActive(maxTotal), maxWait(maxWaitMills), validationn query
- JDBC
    - Socket timeout등
- Web Server
    - Apache Httpd : maxClients
- Web Application Server
    - Tomcat : maxThreads, AJP connector의 backlog 값
- JVM : GC option
- [Apache MaxClients와 Tomcat의 Full GC](https://d2.naver.com/helloworld/132178)
- [JDBC Timeout 이해하기](https://d2.naver.com/helloworld/1321)
- [Garbage Collection 튜닝](https://d2.naver.com/helloworld/37111)

## Example - Memory Leak 경로 제거
### Problem Description
- Step C
    - 서버 올린지 오래되면 잦은 GC, OOM

### How to solve?
- 주로 Cache 로직에서 발생
    - 해당 서비스팀에서 직접 만든 Cache 로직이 있는가?
    - Cache 용량의 한도값이 적절한가?
    - 모든 서버에 같은 현상이 궁극적으로 생김.
- Thread 불안정성에 의한 Memory Leak
    - 일부 서버에만 OOM 발생

## Trouble Shooting Tool
- Thread Dump
    - <http://fastthread.io/>
- Heap Dump
    - [MAT(Eclipse Memory Analyzer)](https://www.eclipse.org/mat/)
- GC Log 분석
    - [HPJMeter](https://h20392.www2.hpe.com/portal/swdepot/displayProductInfo.do?productNumber=HPJMETER)
- Profiler
    - [Yourkit](https://www.yourkit.com/)


## 정리하자면?
- Trouble Shooting은 복합적인 원인으로 구성된 경우가 많습니다.
    - 단순히 증상만으로 판단할 수 없습니다.
    - 종합적으로 많은 정보들을 연결해서 봐야합니다.
    - 같은 결함이 다른 요인과 얽히면 현상이 다르게 나타납니다.
    - 어플리케이션 코드 + 라이브러리의 코드
        - 양쪽을 다 확인해야 문제 파악이 가능합니다.
    - 같은 현상이라도 근본원인이 다른 경우도 있습니다.
- 수집 비용이 싼 정보로 원인을 밝혀낼 수 있다면 해결이 더 빠릅니다.
    - 싼 비용으로 수집할 수 있는 정보부터 빠르게.
    - WAS와 DB의 자원 모니터링, 어플리케이션 로그, 소스 스택덤프
    - 힙덤프까지 가면 취득/분석비용이 더 비쌉니다.
- Trouble Shooting 도구는 도구일 뿐
    - 도구 자체가 문제를 해결해주지는 않습니다.
        - 문제 해석, 추론 과정이 더 중요합니다.
    - Dump에서 나오는 클래스, 라이브러리에 대한 지식이 있어야 근본 원인을 파악할 수 있습니다.

## 후기
- 개발자는 ROI(Return on investment)를 늘 고민하라는 조언을 들은 적이 있다.
- 정상혁님 슬라이드를 보면서 하나의 정보를 얻더라도 ROI를 생각하고 체계적으로 확인해가는 것을 느낄 수 있었다.
- 슬라이드를 보면서 아직 모르는 용어와 해본 경험이 없는 것들이 너무 많기에 추가로 정리해가야겠다.

## Reference
- <https://www.slideshare.net/deview/d2-java-pinpoint>
- [제11회 D2 OPEN SEMINAR 'Java 애플리케이션 트러블 슈팅' 편](https://d2.naver.com/helloworld/1286587)
- [Garbage Collection 모니터링 방법](https://d2.naver.com/helloworld/6043)
- [Java 시스템 운영 중 알아두면 쓸모 있는 지식들](https://www.holaxprogramming.com/2017/10/09/java-jvm-performance/)
- <http://kwonnam.pe.kr/wiki/java/gc>

