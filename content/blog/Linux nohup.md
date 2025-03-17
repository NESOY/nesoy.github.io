---
aliases: [/articles/2018-11/Linux-nohup]
date: 2018-11-23
tags: [Linux]
title: Linux Background Process 실행하기
---
# Linux Nohup
## Example
- 우리는 종종 Background로 Process를 실행해야 하는 경우가 있습니다.
    - 모니터링, 데이터 전송, 큰 파일의 압축을 푸는 과정.

- 일반적으론 `&`을 사용하여 Process를 Background에 실행하도록 지정합니다.

```shell
$ testScript.sh &
```

### 문제점
- 접속했던 터미널 세션이 끊어지게 되면 Background로 실행하던 Process가 같이 종료되는 문제가 발생합니다.


### How to Solve?
```shell
$ nohup testScript.sh &
```

### Background Process 확인하기
```shell
$ ps -ef | grep testScript.sh
```

### Nohup 종료하기
```shell
$ kill [process id]
```

### Nohup Log
- `nohup.out`으로 process 출력물이 redirect되어 저장됩니다.

## Reference
- <http://changpd.blogspot.com/2013/04/linux-nohup-xxxsh.html>
