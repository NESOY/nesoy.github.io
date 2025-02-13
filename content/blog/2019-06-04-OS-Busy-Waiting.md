---
title: Busy Waiting이란?
tags:
  - OS
date: 2019-06-04
aliases: 
  - ../articles/2019-06/OS-Busy-Waiting
---

![[Assets/logo/os.jpg]]


## Busy Waiting이란?
- 원하는 자원을 얻기 위해 기다리는 것이 아니라 `권한을 얻을 때까지 확인하는 것`을 의미합니다.

### Busy Waiting은 어떤 상황일때 사용하는게 좋을까?
- 자원의 권한을 얻는데 많은 시간이 소요되지 않는 상황인 경우.
- Context Switching 비용보다 성능적으로 더 우수한 상황인 경우.

### Busy Waiting의 단점은 없을까?
- 권한 획득을 위해 많은 CPU를 낭비한다는 단점이 있습니다.

### Busy Waiting말고 다른 방법은 없을까?
- 지속적으로 확인하는 Busy Waiting이 아닌 `Sleeping`이라는 방법을 사용할 수 있습니다.

### Sleeping이란?
- 권한을 얻기 위해 기다리는 시간을 `wait queue`에 실행 중인 Thread 정보를 담고 다른 Thread에게 CPU를 양보하는 것을 의미합니다.
- 커널은 권한 이벤트가 발생하면 `wait queue`에 담긴 Thread를 깨워 CPU를 부여합니다.

### Sleeping은 어떤 상황일때 사용하는게 좋을까?
- 기다리는 시간이 예측이 불가능한 상황인 경우.

### Sleeping의 단점은 없을까?
- wait queue에 넣는 비용 + Context Switching 비용이 드는 단점이 있습니다.

## Reference
- <https://www.quora.com/What-does-busy-waiting-mean>
