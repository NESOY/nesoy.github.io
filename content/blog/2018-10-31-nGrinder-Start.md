---
title: nGrinder 시작하기
date: 2018-10-31
aliases: 
  - ../articles/2018-10/nGrinder-Start
---

## nGrinder의 구성요소는?
### Controller
- 웹기반의 GUI 시스템
- 유저 관리
    - 다른 컴퓨터를 유저로 관리
- 에이전트 관리
- 부하 테스트 실시 & 모니터링
- 부하 시나리오 작성 테스트 저장 / 재활용

### Agent
- 부하를 발생시키는 대상입니다.
- Controller의 지휘를 받습니다.
- 복수의 머신에 설치해서 Controller의 신호에 따라서 일시에 부하를 발생합니다.

## How to install nGrinder? 🧐

### Requirement
- java JDK 1.6 이상
- tomcat 6.x 이상

#### Tomcat 설정하기
- nGrinder는 자원이 조금 더 필요하기에..
- tomcat의 catalina.sh를 수정이 필요합니다.

```shell
JAVA_OPTS="-Xms600m -Xmx1024m -XX:MaxPermSize=200m"
```

![[Assets/posts/20181031/1.png]]

### Controller install

#### releases를 다운받습니다.
- <https://github.com/naver/ngrinder/releases>

![[Assets/posts/20181031/2.png]]

#### 다운받은 nGrinder를 tomcat의 webapp에 넣습니다.

![[Assets/posts/20181031/3.png]]

#### tomcat을 실행하고 nGrinder에 들어가면?
- <http://localhost:8080/ngrinder-controller-3.4.2>
- 초기 아이디와 비밀번호입니다.
    - ID/PW : admin / admin

![[Assets/posts/20181031/4.png]]

### Agent install
- admin 버튼을 누르시면 Download Agent 누르시면 쉽게 받을 수 있습니다.

![[Assets/posts/20181031/5.png]]


#### Agent 압축 풀기

```shell
sudo tar xvfz ngrinder-agent-3.4.2-localhost.tar
```

![[Assets/posts/20181031/6.png]]


### Agent 설정하기
- `.ngrinder_agent` 폴더에 들어갑니다.

![[Assets/posts/20181031/7.png]]

- 들어가시면 `agent.conf`라는 설정파일이 있습니다.

![[Assets/posts/20181031/8.png]]

- 나중에 agent의 `controller`나 `port`를 변경하고 싶을땐 여기서 설정하시면 됩니다.
- 현재는 controller와 agent가 동일한 컴퓨터에서 동작하기 때문에 localhost로 진행하겠습니다.

![[Assets/posts/20181031/9.png]]

### Agent 시작하기
- agent 실행 스크립트를 실행합니다.

![[Assets/posts/20181031/10.png]]

- Dashboard의 Agent-Management에서 사용가능한 Agent를 확인할 수 있습니다.

![[Assets/posts/20181031/11.png]]

#### 사용가능한 Agent
- Approved 상태를 `Approved`로 바꿔주셔야 사용 가능합니다.

![[Assets/posts/20181031/12.png]]

## How to use nGrinder? 🎮
- `https://www.google.com` 테스트를 해보겠습니다.

![[Assets/posts/20181031/13.png]]

### Test 설정하기

![[Assets/posts/20181031/14.png]]

- `Agent` : 사용할 Agent 개수
- `Vuser per Agent` : Agent당 가상 user
    - Process
    - Thread
    - 되도록이면 Thread를 많이 지정하는게 좋습니다.
- `Rame-Up` : 천천히 부하를 늘려가면서 진행하는 방식
    - 초기 개수, 증가 크기 등등 설정할 수 있습니다.
- `Duration` : 테스트 시간
- `Run Count` : 각 Thread 당 실행 횟수
- `Script` : Test Script

### Test 실행하기
- `Save and Start`를 누르면 테스트가 시작합니다.


#### Test 시작 후 Agent 모습
- Thread가 시작되는 모습을 확인할 수 있습니다.

![[Assets/posts/20181031/15.png]]


#### Test 하는 과정의 Dashboard
- Sample 정보를 취득할 수 있습니다.
- 점점 쌓여가는 정보도 취득할 수 있습니다.

![[Assets/posts/20181031/16.png]]

#### Test 결과 Report
- 평균 TPS
- 최고 TPS
- 평균 Test 시간
- Error 개수

![[Assets/posts/20181031/17.png]]


## Reference
- <https://github.com/naver/ngrinder/releases>
- <https://opentutorials.org/module/351/3334>
