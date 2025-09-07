---
title: Java Flight Recorder
description:
aliases: [JFR]
date: 2025-09-07
tags: [Java, JDK]
comments: true
---
# Java Flight Recorder
- Provide a low-overhead data collection framework for troubleshooting Java applications and the HotSpot JVM.
- 자바 어플리케이션과 HotSpot JVM의 데이터를 낮은 오버헤드로 수집하여 트러블 슈팅에 필요한 정보를 제공하는 도구

## Licence
- 원래 JFR은 Oracle JDK에 있는 기능이였지만, 오픈소스[^1]로 변경되었다.
```
Flight Recorder has existed for many years and was previously a commercial feature of the Oracle JDK.
This JEP moves the source code to the open repository to make the feature generally available.
```

## 수집 대상
- OS
    - Memory, CPU Load and CPU information, native libraries, process information
- JVM
    - Flags, GC configuration, compiler configuration
    - Method profiling event
    - Memory leak event
- JDK libraries
    - Socket IO, File IO, Exceptions and Errors, modules

### Events
- JFR은 JVM과 관련된 이벤트를 수집한다.
	- duration event : 특정 시간 동안 발생하는 이벤트 ex) 메소드 실행 시간
	- instant event : 즉시 발생하고 기록되는 이벤트 ex) 스레드 차단
	- sample event : 주기적으로 시스템 상태를 점검하는 이벤트 ex) heap

## How to use
### JFR 기능 활성화
- 자바 어플리케이션을 실행할때 아래의 옵션을 추가한다.
```
-XX:+UnlockCommercialFeatures
-XX:+FlightRecorder
```

### [[Command jcmd]]를 통해 JFR 파일 생성하기
- `settings=profile`을 추가해야 더 많은 정보를 수집한다.
	- 그만큼 부하가 있기 때문에 짧은 시간 수집할때 활용하는게 좋다.
	- `$JAVA_HOME/jre/lib/jfr/default.jfc, profile.jfc`에 미리 설정된 프로파일이 존재한다.
```
# jfr 생성 시작
jcmd {프로세스 ID} JFR.start duration=30s settings=profile filename=test.jfr

# JFR.check - checks running JFR recording
jcmd {프로세스 ID} JFR.check

# JFR.stop
jcmd {프로세스 ID} JFR.stop recording=2
```

### Kubernetes를 통해 JFR 파일 가져오기
- 아래의 명령어를 실행하면 로컬로 복사할 수 있다.
```
kubectl cp {namespace}/{pod-name}:{file-path} {local-path}
```

## How to read
- 로컬로 가져온 파일을 [[JDK Mission Control]], [[IntelliJ]], [[Visualvm]]으로 읽을 수 있다.
- CPU
	- 어느 Thread가 가장 CPU를 많이 사용하고 있는지 알 수 있다.
	- CPU 사용량을 최적화 할때 유심히 보면 제일 좋다.
- Memory
	- 원시값 박싱, 객체 생성과정에서 발생하는 메모리를 찾아서 최적화 할때 좋다.
- Flame Graph
	- 리소스를 가장 많이 소비하는 Thread 함수 부터 노출된다.
	- IntelliJ 기준 사용률이 높을수록 왼쪽에 위치하며 너비가 넓음

### JDK 21에서 제공하는 JFR view
- 과거에는 별도의 프로그램을 통해 JFR을 해석해야 했지만, JDK에 JFR view cli [^2]기능이 포함되었다.
```
jfr view hot-methods test.jfr
```

## Reference
- https://openjdk.org/jeps/328
- https://docs.oracle.com/en/java/java-components/jdk-mission-control/8/user-guide/using-jdk-flight-recorder.html
- https://www.baeldung.com/java-flight-recorder-monitoring
- https://blog.naver.com/kbh3983/220995466033

[^1]: Opensource하자마자 팀 전체를 layoff 했다는 소식이 있다. https://www.infoq.com/news/2018/06/open-source-jmc/
[^2]: https://www.baeldung.com/java-flight-recorder-view