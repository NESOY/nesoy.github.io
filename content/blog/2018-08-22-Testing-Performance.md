---
title: 성능, 부하, 스트레스 테스트에 대하여
tags:
  - Testing
date: 2018-08-22
aliases: 
  - ../articles/2018-08/Testing-Performance
---

## 들어가며
- 성능, 부하, 스트레스 테스트를 진행하고 튜닝하는 작업에는 굉장히 오랜시간과 노력이 필요합니다.
- 튜닝하는 과정에서 실패를 할 수도 있습니다.
- 하다가 점점 화가 날 수도 있습니다 :(

> 시작하기에 앞서 충분한 시간과 노력을 투자할 수 있는 상황인지 확인이 필요합니다.

## 성능, 부하, 스트레스 테스트를 왜(Why) 할까요?
- 우리가 작성한 서버가 평소에는 제대로 동작하고 있다고 가정해봅시다.

#### 갑자기 많은 인기(?) 덕분에 많은 사용자가 유입이 많아진다면?
![[assets/emoticon/crowds.gif]]
- 서버는 점점 느려지다가 이상한 모습을 보이면서 제대로 동작하지 않습니다.
- 갑자기 사용자가 많아지는 행복한 미래를 `미리 겪어보고 어느 부분이 문제인지 파악하고 해결 방안을 고민하고 적용`하기 위해 테스트가 필요합니다.


## 어느(Where) 부분을 테스트 해야 할까요?

### Application
- TPS(Transaction Per Second)
- 응답 시간(Response Time)

### Middleware
- Message Queue
  - RabbitMQ
- Database
  - MySQL(slow query, Index)
- Web Server
  - Apache(Network outbound io (bandwidth))
  - Tomcat(Idle Thread)

### Infra
- CPU
- Memory(Swapping)
- Disk IO(파일 시스템)
- Network IO(고용량의 파일이나 이미지 전송에서 병목)


## 테스트 종류는 어떤 것들이 있을까요?

### 성능(Performance) Test
> 시스템의 요소가 특정 상황에서 어느 정도의 성능을 보이는지를 측정하는 테스트.

- 기존 시스템에 대한 benchmarking 하는 것입니다.
- 어플리케이션의 결함을 찾는 목적이 아닙니다.
- 성능에 대한 정확하고 면밀한 모니터링을 진행해야 합니다.

### 부하(Load) Test
> 임계치의 한계에 도달할 때까지 시스템에 부하를 꾸준히 증가시키며 진행하는 테스트.

- 부하 상황에서 시스템이 어떻게 동작하는지 모니터링 하고 정보를 얻습니다.
- 발생시키는 부하는 실제 시스템에 적용될 예상 트래픽이어야 합니다.
- `volume test` 또는 `endurance test`라고도 합니다.
- Web Server, Database, Infra등 모든 요소의 한계를 찾아서 미래에 발생할 부하에 대비하는 것이 목표입니다.

#### 예를 들자면?
- 수강 신청하는 인원이 어느정도 예상되는지 알고 싶은 경우

### 스트레스(Stress) Test
> 시스템이 과부하 상태에서 어떻게 작동하는지를 검사하는 테스트.

- 시스템의 실패를 확인하고 모니터링하는 과정이 정상적으로 이루어지는지
- 민감한 정보나 보안상의 문제가 노출되지 않는지
- 장애 조치와 복구 절차가 효과적이고 효율적인지

#### Soak Test
- 한참 동안 부하를 가해서, 메모리 누수나 자원 누수를 알아내는 테스트.

#### Negative Test
  - 부하를 발생시킨 상태에서 특정 시스템 구성요소 중 일부를 제거하는 테스트.

#### Fatigue Test
  - 대역폭 용량을 뛰어넘는 부하를 발생시켜 테스트.


## Graph를 해석해 볼까요?
![[Assets/posts/20180822/1.png]]

### 포화점(Saturation Point)
- 시스템은 언제나 처리에 한계가 있으므로 어느 순간에 더 이상 증가하지 않고 그래프가 꺽이게 됩니다.

### 버클존(Buckle zone)
- 시스템이 과부하로 인해 내부 자원이 서로 경쟁 상태나 적체 상태가 심해지기 때문에 최대 처리량보다 더 떨어지는 경우가 생깁니다.

### 최대 성능, 비즈니스 관점 최대 성능
- 포화점에서 얻은 최대 처리량이 실제 최대 성능으로 보면 안됩니다.
- 비즈니스 관점에서 최대 처리량을 재정의하고 최대 처리량과 여유를 두는 것이 좋습니다.

## 용어는 어떤게 있을까요?

#### Workload
- 주어진 시간 동안 컴퓨터가 처리한 일의 양. 혹은 그러기 위해 부과된 연속된 일.
- Web 기반 시스템에서는 주로 HTTP 요청이 Workload 역할을 하게 됩니다.

#### Metric
- 응답 시간(Response Time)
- 출력량(Throughput)
- TPS(Transaction Per Second)
- CPU의 연산 속도인 MFLOPS(Millions of Floating-point Operations Per Second)

#### 응답 시간(Response Time)
- 인터넷에서 패킷이 라우팅되는 시간도 포함된다.
- 평균 응답 시간(Mean Time)이 Web Server형 시스템의 성능 분석에서 중요합니다.

#### 처리량(Throughput)
- PPS(Page Per Second) : 웹 시스템에서 특정 페이지에 대한 요청.
- RPS(Request Per Second)
- TPS(Transaction Per Second) : 데이터베이스의 트랜잭션 기반 시스템에서 사용.
- BPS(Bits Per Second) : 네트워크의 경우는 초당 비트 수

#### Reliability
- 에러의 확률 혹은 에러 간의 평균 시간으로 측정됩니다.
- Error-Free Seconds

#### Bottleneck
- 구성 컴포넌트 중 활용도가 가장 높은 컴포넌트를 일컫는 말입니다.
- 튜닝(tuning)이란, 활용도가 100%인 컴퓨넌트가 정말 100%로 사용되어야 하는가를 살피고, 각 컴포넌트 간 활용도의 밸런스를 맞추어서 전체 시스템이 가장 좋은 성능을 발휘하도록 개선하는 작업입니다.

## Tool

### Monitoring Tool
- APM (Application Performance Monitoring)
  - [제니퍼](http://www.jennifersoft.com)
  - [Scouter](https://github.com/scouter-project/scouter)
  - [Pinpoint](https://github.com/naver/pinpoint)
  - [개발자들이 좋아하는 APM 소프트웨어 9선 - CIO Korea](http://www.ciokorea.com/news/37808)

### Testing Tool
- [JMeter](https://jmeter.apache.org/)
- [NGrinder](http://naver.github.io/ngrinder/)
- [LoadRunner](https://software.microfocus.com/ko-kr/products/loadrunner-load-testing/overview)

### Infra Tool
- [리눅스 서버 60초안에 상황파악하기](https://b.luavis.kr/server/linux-performance-analysis)
- [Ganglia](http://ganglia.sourceforge.net/)
- [Cacti](https://www.cacti.net/)

## Reference
- <http://woowabros.github.io/experience/2018/05/08/billing-performance_test_experience.html>
- <https://www.softwaretestinghelp.com/what-is-performance-testing-load-testing-stress-testing/>
- <http://bcho.tistory.com/787?category=75945>
- <http://www.softfactory.org/test/performance>
- <https://www.slideshare.net/sunnykwak90/ss-44875669>
- <https://deview.kr/2013/detail.nhn?topicSeq=2>
