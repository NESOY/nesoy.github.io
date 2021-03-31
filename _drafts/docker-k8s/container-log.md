## Container Log

- logging driver
    - https://docs.docker.com/config/containers/logging/configure/

- 종류
    - syslog
    - journald
    - awslogs
    - gcplogs
    - fluentd

- 컨테이너 안에 로그를 파일로 남기면 컨테이너를 삭제할 때
    - 로그도 함께 잃어버린다는 큰 문제가 발생
    - 도커처럼 로그를 표준 출력으로 남기면 로그가 호스트에 위치한 파일에 남는다.
    - 로그를 표준 출력으로 남기고 이 내용을 호스트에서 파일에 수집하는 것이 더 간단하다.

- `--log-opt`
    - `max-size`
    - `max-file`
- /etc/docker/daemon.json