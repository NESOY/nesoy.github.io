---
aliases: [/articles/2018-10/Deview-2018]
comments: false
date: 2018-10-11
description: 
tags: [Deview, Review]
title: Deview 2018 후기
---
# Deview 2018 후기
![[assets/posts/20181011/1.png]]

## 지난 1년간의 웨일 브라우저와 그 미래 - 김효님
### Whale 현재 상황
- Desktop : 1100만
- Mobile : 42만
- XWhale(Naver 앱 내부엔진) : 3000만
- 전체 브라우저의 Whale 시장 점유율 : 1.4%

### 예전에 목표 했던 것
- Move the Web Forward
    - Active-x, exe 제거
    - 플러그인 호환 모드 지원 중단.
    - 신한은행에 적용.
    - 아직도 남은 문제들이 있지만 현재 정부의 노력으로 변화가 생길 것 같은 기대.
- 모두가 쉽게 쓰는 브라우저 웨일
    - 다양한 플랫폼
    - 참여 플랫폼 : 확장앱, 테마 스토어, 개발자 센터
- 기술 / 보안
    - 성능 / 메모리 / 파워 절약
    - Safe Browsing


#### 모두가 쉽게 쓰는 브라우저 웨일
- 왜 Mobile Whale을 시작했는가?
    - Desktop Whale 사용자 만족도가 높아서 도전해보자.
- 세상엔 많은 모바일 브라우저가 많다.
    - 많은 브라우저와 Whale은 무엇이 `차별화` 되었는가?
        - 스페이스
        - 사이드바 : 번역
        - 디자인 : 새탭, 배경 테마
        - 편의기능 : 다중 검색 엔진
        - 기술 : 웹번역, 각종 세이빙 기능
- Mobile 특화 기능
    - 퀵바 : 사이트로 가장 빠르게 이동하는 방법
    - 퀵서치 : 가장 빠른 검색
    - 벨리 : 사이드뷰
    - 강력한 홈버튼
    - 심플 모드 : 보다 간결한 메인 UI
    - 뉴탭 : 사진 배경으로 감성을 전달
    - 퀵 네비게이션, 스마트 네비게이션, 고급 미디어

#### `모든 기능을 다 넣자` VS `최대한 심플하게`
- 기능 == 버튼
- 새로운 기능 == 추가 버튼
- 버튼이 많아지면?
    - 복잡 == 모바일에 적합하지 않음.
    - 모바일은 심플해야하는데..
- 결국엔?
    - 많은 고민 끝에 아래에 5개의 버튼 상단의 버튼 2개 구조

#### `버튼(기능)을 뷰에서 제거하면 사용자가 기능을 찾아서 사용할까?`
- 아니다. 사용자들은 기능을 찾아서 사용하지 않는다.
- 홈버튼은 찾아서 사용하겠지만 벨리버튼은 사용자가 찾아서 사용하지 않을 것 같다.
- 그래서 벨리버튼을 살리고 홈버튼을 제거했다.

#### 새탭의 감성은 시간 Resource 부족으로 포기
- 안드로이드 : 데스크탑과 같은 크로미움 베이스
- ios : 크로미움으로 개발 시작해볼까?
    - iOS 개발자가 `Object C, C++`를 잘 모르는 상황이 발생
        - 개발 속도가 원하는 만큼 나오지 않음.
    - 기존 버젼 폐기 및 신규 개발 : `Swift`
    - iOS, 안드로이드 완전한 단일 버전은 불가능
        - 다른 기술, 다른 감성
        - 엔진 개발 vs OS 제공 단일 엔진

#### 우리가 스크랩하는 방법?
- 카톡, 라인의 개인 대화방
- 북마크
- 메모장에 link와 설명
- 페이스북 나만 보기 / 비공개
- 전용앱(포켓, Keep)

> 솔루션이 많다는 얘기는 강력한 솔루션이 없다라는 것을 의미.

- 브라우저에 붙여서 강력하게 만들자. 그래서 탄생한게 `벨리(Belly)`

#### 하지만 사용자는 벨리가 뭔지 모른다?
- 많은 설명이 필요하면 그만큼 직관적이지 않다는 것.
- 좀 더 서비스를 직관적으로 이해하도록 해야함.

### 새로운 Whale
- 메인 UI는 최대한 심플하게
    - 사용자에게 넓은 화면
    - 필요한 기능은 메뉴 안으로
    - 메뉴는 보다 계층적으로
- 새탭 : 감성과 편리/정보를 같이 잡아주는 곳
- `Belly -> Scrapbook`
    - Rebranding
    - 다시 보고 싶은 건 뭐든 담는 스크랩
    - 사용자들에게 제대로 전달 안된 이유가 이름이 아니길 바라면서.

### 데스크탑과 모바일
- 데스크탑 웨일을 쓰는 이유
    - 캡쳐가 편해서, 새탭/디자인이 이뻐서
    - 모두 다르다.
- 모바일 웨일을 쓰는 이유
    - 데스크탑처럼 다양하지 않고 단순하다.
    - 탄탄한 브라우저의 기본기가 필요하다.

### 앞으로의 Whale
- Naver Tech Platform
= Global Platform
- Future Info Platform
    - 사물 브라우저

### Question
- Naver - Whale 관계?
    - 크롬과 구글 앱의 관계
        - Naver앱은 Naver를 사용하기 최적화된 앱
        - Whale앱은 브라우징하기 최적화된 앱
    - 앞으로 Naver와 Whale의 엔진이 동일하게 진행될 예정
- Progressive Web 지원 여부?
    - 지원할 예정
- 크로미움의 보안 이슈과 같은 내용은 어떻게 동기화 하고 있나?
    - 보안에 대한 issue는 cherrypick하여 rebase하여 동기화 중.
- Global 전략을 위해 Opensource할 생각이 있는가?
    - Yes.
    - 오픈소스에는 준비할게 많아서 시간이 필요.

### 후기
- 웨일 확장앱 플랫폼 소개.
    - 이런건 누가 만들까? 결국엔 개발자들.
    - 개발자들이 웨일가서 만들까? 크롬에 가서 만들까?
    - 생태계 조성이 필요해 보인다.
- Whale - Conference 진행할 예정.
- 왜 IT 대기업들은 Browser를 만드려고 할까?
    - 구글의 크롬, 애플의 사파리, 네이버의 웨일, 아마존, 바이두 등등.
    - 소비자를 Lock-in하는 효과를 얻지 않을까?
        - 하지만 생각보다 많은 리소스와 지식을 가진 개발자들이 필요해 보인다.

### Slide
<iframe src="//www.slideshare.net/slideshow/embed_code/key/KpsSbPHTsDCso7" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

-----------

## 서비스 오리엔티드 블록체인을 위한 스케일링 문제 해결 - 이홍규님

### 후기
- 블록체인의 기본적인 개념이 없어서.. 너무 어려움.
- 나중에 블록체인 구조와 이론 책을 읽어보고 다음에 다시 읽어보자.

### Slide
<iframe src="//www.slideshare.net/slideshow/embed_code/key/hZlfU1Rl7VnATn" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

-----------

## Javascript 배틀그라운드로부터 살아남기 - 박재성님
- Marc Andreessen
    - 당시 웹은 정적이였다. DOM 인터렉션을 통해 다이내믹한 웹을 만들고자 하는 비전
    - Mocha -> Livescript -> JavaScript
    - MS의 JS : JScript
    - Action Script : Flash에서 사용
- Ajax, Json의 등장.
- Server-Side Javascript
    - Node.js
- Modules
    - AMD(RequireJS), CommonJs
- Package Manager
    - NPM
    - bouler

### Framework 등장.
- 1세대.
    - jQuery
    - Prototype
    - MooTools
- 2세대
    - AngularJs
    - React
    - Vue

### 다양한 Browser의 등장.
- Evergreen Browser
    - 과거와 달라진 브라우저 버전의 중요성
- Vanilla 개발은 일반적이지 않음


### 오늘날의 JS 개발은?
- 프레임워크 + 개발 도구
- Library -> Framework
    - 크로스 브라우징 문제가 Native Level로 내려감
    - 따라서 그런 Library를 제거하는 모습
        - Github에서 jQuery를 제거하는 움직임

### Babel
- 2014년 발표.
- ES6 -> ES5로 전환해줌.
    - 브라우저가 새 문법을 지원하지 않더라도 사용가능.
    - `->` function 알아서 변환해줌.

### 2018년 동향
- 버전 구분 중요성 감소
    - Evergreen 브라우저는 스펙을 빠르게 구현
- 정적 타입 시스템(loose typing)
    - 버그 감소 (15% 감소 연구결과)
    - 효율적 코드작성
    - Language : `Typescript`, `PureScript`
    - Tools: `Flow`

#### Web Assembly
- 어느 브라우저에서나 빠르게 실행되는 바이너리로 바꾸는 기술

#### React
- 라이센스 이슈 -> MIT
- 성능 개선.

#### Vue.js
- 40K Github Stars
- Nuxt.js
- NativeScript - Vue
- Ver 3.0

#### Angular
- Ivy Renderer
- Angular Elements



#### Web Components
- All Major browsers Support


#### Polymer
- Factory 메서드 통한 요소정의


#### 브라우저 밖의 동향
- NPM
    - 가장 많이 사용하고 모듈도 많음.
- YARN
    - NPM의 전체 다운로드의 0.03%
    - 속도도 NPM만큼 빠르지 않음.
- Webpack
    - 향상된 빌드 시간 : 60 ~ 98% 감소
    - mode property
        - development, production, none
    - Configuration Headache
    - Parcel과 같은 도구는 무설정 번들링

### 정리하자면?
- 매몰비용 오류의 함정
    - 특정 도구에 투자한 노력이 많아지면, 나의 선택(도구)이 합리적이었다는 것을 자신이나 다른 사람들에게 설득하기 위해 노력.
- Magpie Developer
    - 대체로 개발자들은 기존에 문제없이 사용하던 기술들을 뒤로하고, 새롭고 반짝 이는 것들에 너무 쉽게 관심을 빼앗긴다.
    - 모든 기술에는 장점과 단점이 있으니 파악부터하자.
- 최신 업데이트 항상 정답인가?
    - 무엇이 정답이라 할 수 없다.
    - 각자의 사정은 모두 다르다.
    - 상황에 따라 적절한 정답을 찾아가는게 핵심.
- 우리의 자세는?
    - Everything is amazing and nobody is happy
    - Expert로써 모든 플랫폼의 모든 것을 알아야 한다는 생각
    - 모든 것을 배우는 것이 해결책인가?
    - 단순하게 현재 작업에 필요한 것. 또는 끌리는 것에 집중
    - 적당한 밸런스
        - 적당한 호기심
        - `지속적인 꾸준함은 필요.`

### 후기
- Front 세계는 아직 내겐 너무 다양하고 많은 것 같다.
- 토이 프로젝트로 하나만 시도해보는 것도 나쁘지 않을 것 같다.
- 들어본 이름들이 있었지만 정확히 무슨 역할인지 몰랐는데 이번 기회에 알게 되었다.

### Slide
<iframe src="//www.slideshare.net/slideshow/embed_code/key/nlIUvVSyAqHCTg" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

-----------

## 네이버에서 사용되는 여러가지 Data Platform, 그리고 Mongo DB - 이덕현님

### 네이버에서의 Data Platform
- 초기 모습 : 2 tier 구조
    - Web Server
    - RDBMS
        - MySQL, ORACLE
- 서비스가 점점 커지면서 DB Query는 점점 복잡하고 무거워 짐
    - 빠른 응답을 보장하기 위해, DB앞에 Cache 사용
    - Redis, ARCUS
- 지표를 저장하기에는 RDBMS는 공간과 비용에서 문제가 발생
    - 원활한 데이터 처리를 위해 Hadoop기반의 HBase 사용
- `Schema-less`하고 `Sharding과 secondary Index`, `Transaction`처리가 가능한 Data Platform `MongoDB`도 지원하게 됨.


### Schema-less
```json
table A{
    userNumber int
    , userCellPhoneNumber char(13)
}
```
- RDBMS : 1 row 당 17byte
- MongoDB : 1 doc 당 46byte (_id 포함시 58Byte) Type 저장
- RDBMS에 비해 disk READ/WRITE (IO) 측면에서 보면 더 안 좋을 수 있다.

### Sharding
- Scale up
    - 단일 서버 spec 증가
- Scale out
    - 여러대의 서버로 데이터 분산
- RDBMS는 응용에서 샤딩으로 Scale out 구현 할 수 있지만?
    - 확장성이 떨어지며
    - 개발 및 관리의 Overhead 발생
- 이를 해결하기 위해 Db Level에서 Sharding을 제공하는 NoSQL
    - 개발 Cost 절감

### Secondary Index
- 단순 bigdata성 데이터는 Hbase를 사용하고 있음
    - HBase는 제품 자체에서 Secondary Index를 제공해주지 않음
    - Coprocessor, hIndex, Phoenix을 통해 secondary Index와 비슷하게 구현은 가능
    - 검색에 알맞게 데이터를 재 저장하는 방식

### Transaction
- MongoDB ~ 3.6까지
    - 1 Document (row Level Lock)
- MongoDB 4.0부터
    - Multi Document Transaction

### IDB DR
- 서비스가 점점 중요해짐에 따라 IDC 이중화가 필요해짐
    - DR(Disaster Recovery) 요구됨.
- Auto failover가 가능한 Data Platform
- MongoDB 정책 상 홀수로 운영하여
    - 50% 넘는 생존율이 필수

### Mongos 관리
- Mongos(Router) 서버
- Client 서버와 동일하게 있도록 가이드

### L4와 getmore
- Sharding에서의 L4(network switch)사용을 초기에는 권장했으나 getmore 이슈로 제거
- getmore 함수 특성상 질의했던 Node에 다시 질의해야 하는 특성이 있음
    - L4를 사용할 경우 Round Robin을 통해 다시 Node에 질의하기 힘들기 때문에 L4를 제거.

### Mongos <-> shard 커넥션
- Connection 관리에 문제가 있음
    - Connection 관련 Parameter가 너무 낮다면?
        - 성능상 좋지않다.
    - 너무 높게 잡으면?
        - connection이 많아져 장애를 유발할 수 있다.

> 테스트 해보고 상황에 따라 적절하게 반영할 것.

### Storage Engine
- NoSQL Storage Engine 확인하기
- eviction
    - Memory Buffer에서 오래된 data(dirty page) 삭제하는 작업
- checkpoint
    - memory buffer와 disk 사이의 데이터 불일치를 해소하기 위해서 memoery -> disk로 data sync 하는 작업
- compact
    - 주로 새벽시간에 스켸줄로 운영하고 있음.


### 후기
- DBA 관점에서 Storage Engine까지 알게된 좋은 계기가 되었다.

### Slide
<iframe src="//www.slideshare.net/slideshow/embed_code/key/ac1Qzj931DjdxW" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

-----------

## 쿠팡 서비스 Cloud Migration을 통해 배운 것들 - 양원석님
- 100개의 Microservice
    - 목동 IDC, 분당 IDC
    - 서버 추가하기 위해서는 오랜 시간이 소요되는 단점.

#### 문제점
- 추가 및 확장 진행 시간
- 확장하지 못해서 장애 발생

#### 클라우드 이전 원칙
- 확장성을 확보하기 위해 클라우드로 이전
- 서비스 무중단
- 고객에게 만족도에 영향을 주지 않는다.

#### Roman Ride
- 데이터센터와 클라우드 동시운영
- 리스크 최소화
- 작은 변화
- 빠른 Rollback

### Dynamic Routing
- DB Connection Manager
    - 공통 라이브러리 형태
    - Dynamic Config
    - 상태 모니터링과 조작을 위한 admin
    - 빠른 Rollback 지원
    - ZooKeepper를 사용하여 설정 관리
- DB 이관 순서
    - Read DB 연결 이동
    - Write DB 연결 이동
- API Gateway를 통한 트래픽 조절
    - 기존 API Gateway를 활용
- 트래픽이 작고 영향도가 낮은 것부터 진행
- 0 ~ 100% 까지 트래픽 Rame-up
- 빠른 Rollback
- instance size 이슈

### Canary testing
- Blue Green Deployment
- docker로 배포
- 10분간 테스트 진행
- 기존 환경과 비교 테스트
- Metric 정보 비교
    - CPU
    - Memory
    - Load
    - tomcat,requestCount, tomcat.currentThreadBusy
    - jvm.gc.fullgc.times, etc
- Log 수집, 저장
    - ELK Stack
    - Object Storage
    - 압축, 라이프 사이클 적용.
        - 로그 종류 별로 Life cycle을 다르게 적용.
- 분산된 Service의 현황은?
    - Pinpoint를 통해 볼 수 있다.

### 새로운 문제들
- 전파되는 장애
    - 낮아지는 SLA
- 예상치 못한 곳에서 발생하는 장애
    - Noisy Neighbor Problem
    - 공유 자원, 클라우드 서비스 제공 자원
    - 클라우드의 `CPU 자동 패치`로 인한 장애

### 마이크로서비스와 클라우드를 통해 배운 것.

#### 모든 것에서 실패 가능하다.
- Load Balancer
- DB, Cache
- Queue
    - 공용 자원은 되도록이면 사용하지 않는 방식으로
- Object Storage
- Block Storage
    - 비동기 방식
    - MemDisk
- 위 문제를 어떻게 해결할까?
    - Retry
    - Fallback
    - Circuit Breaker
        - Hystrix
        - Valves

#### 예측 못하는 것을 예측하라
- Chaos Engineering
- Chaos Monkey
- 복구 기능 테스트
- 약점 찾아내기


#### 혼돈 속에 살기
- 장애 복구 되었나요?
- 1시간 내에 배포나 변경된 내역 확인 부탁드려요.
- 복잡한 시스템 상황에서 상태 확인 어려움
- 모든 서비스 관계를 알기 어려움
- 안정 상태 찾기
    - 서비스의 건강도 측정
    - 주기 적극 활용
        - 트레픽이 높은 경우
        - 매달 1일 00시
        - 일요일 저녁
- 변경 내역 확인 하기
    - 각 서비스의 상태
    - 배포 이력
    - 인프라 변경 이력
    - dns, security, auth

#### Auto Scaling
- 요청에 따라 자동 조절
- 이벤트 준비 시간 단축
- Target Tracking Policy
- 메트릭 정보(CPU, Request 등)
- 폐기 가능(Disposability)
    - 빠른 시작과 빠른 정상 종료 보장
    - 시작이 오래걸리면 Auto Scaling이 트래픽을 따라가지 못함
    - 정상 종료가 오래 걸리면 새로운 배포시 리소스 문제 발생
    - 빠르게 늘리고 천천히 줄인다.
    - 민감하지 않게 잘 만들기

#### 다른 장애로 부터 배우기
- 사건 사고는 필연적인 것.
- 대용량의 복잡한 분산 시스템
- 끊임없는 변화
- 지속적인 안정화

#### 장애 리포트
- 타임라인
    - Detection에 걸린 시간
    - 원인 찾는데 걸린 시간
    - 복구에 걸린 시간
- 원인 찾기
    - 고객 관점에서 5 why 작성
- 재발 방지
    - Poka-Yoke

#### Site Reliability Engineering (SRE)
- Service Reliability를 책임
- 복잡한 장애 상황에서 컨트롤 타워
- 장애에 대한 지식 공유
- 장애 재발 방지

- 잘한 것
    - 작은 변화와 빠른 Rollback
    - 공통 배포 파이프라인 유지
    - 만든 사람이 운영하는 문화
    - 장애 관리 문화

- 다르게 해보고 싶은 것
    - 복잡도 관리
    - 도커 오케스트레이션 적용
    - 클라우드 네이티브

### 후기
- 클라우드 관련된 내용을 많이 들어봤지만 설명을 너무 잘해주셔서 많이 배우는 세션이였다.
- 모니터링도 중요하지만 어떤 지표를 가지고 어떻게 모니터링할 것인가 하는 부분에서 많이 배운거 같다.
- 모든 경험하신게 `클라우드 네이티브 자바` 책에 녹아 있다니 시간이 된다면 읽어봐야겠다.

### Slide
<iframe src="//www.slideshare.net/slideshow/embed_code/key/2KoOkDt1dbN9vl" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>


-----------
