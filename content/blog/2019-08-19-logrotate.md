---
title: logrotate란?
tags:
  - Linux
date: 2019-08-19
aliases: 
  - ../articles/2019-08/logrotate
---

## 들어가며
> 서비스 운영 중에서 `접속, 에러로그`를 어떻게 관리할까? 고민이 되었고 찾아보니 `logrotate`를 알게 되어 정리하기 위해 작성합니다.

### How to install?
- `sudo yum install -y logrotate`

### `logrotate` 설정은 어떻게 할까?
- `/etc/logrotate.conf`를 통해 설정할 수 있다.
- logrotate의 기본 설정파일

#### 그럼 추가/변경은 어디서 할까?
- `logrotate.d`에 원하는 설정 파일을 추가/변경할 수 있습니다.

```
logrotate.d
|-- dracut
|-- nginx
|-- psacct
|-- syslog
`-- yum
```

#### Example - nginx logrotate 파일
```
/var/log/nginx/*log {
    create 0664 nginx root  # [권한 유저 그룹]으로 rotation된 로그파일 생성
    daily                   # 백업 주기 daily, weekly, monthly, yearly
    rotate 10               # 최대 로그 파일 개수
    missingok               # 로그 파일이 존재하지 않아도 에러발생 X
    notifempty              # 로그가 비어있다면 로테이트 진행 X
    compress                # gzip으로 압축
    sharedscripts           # 로그파일이 여러개 있어도 스크립트를 공유하여 prerotate, postrotate 스크립트를 한번만 실행
    postrotate              # 실행 후 스트립트 파일 실행
        /etc/init.d/nginx reopen_logs
    endscript
}
```


#### logrotate 상태 파일 확인하기
- `/var/lib/logrotate.status`에 기록하여 cron으로 logrotate는 동작합니다.

```
# cat /var/lib/logrotate.status

# logrotate.status #
logrotate state -- version 2
"/var/log/nginx/error.log" 2019-8-16
```


## Reference
- <https://manpages.debian.org/jessie/logrotate/logrotate.8.en.html>
- <https://blog.b1ue.sh//logrotate/>
- <https://m.blog.naver.com/PostView.nhn?blogId=ncloud24&logNo=220942273629>
- <https://kwonnam.pe.kr/wiki/java/tomcat/log>
