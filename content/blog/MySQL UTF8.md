---
aliases: [/articles/2017-05/mysql-UTF8]
comments: false
date: 2017-05-09
description: 
tags: [Encoding, MySQL]
title: MySQL 한글 깨짐 현상 해결하기(UTF8)
---
# MySQL 한글 깨짐 현상 해결하기(UTF8)
> 프로젝트를 진행하던 도중에 DB에 값을 입력할때 한글값이 제대로 저장이 안되는 경우가 있다. character set 설정문제가 대부분이며 이와 같은 경우에 UTF-8로 설정하면 쉽게 고칠 수 있다. MySQL의 설정하는 법을 기록하기 위해 블로그를 쓴다.

## MySQL 설치 기본 상황
- `latin1`으로 Character-Set이 설정되어있다.
- 한글을 사용하기 위해서는 `UTF-8`로 변경하면 사용할 수 있다.

## MySQL 한글 깨짐 현상 해결하기
- 한글을 저장하면 ??? 형태의 모습을 볼 수 있다.

```
+----+------+
| id | name |
+----+------+
|  1 | ???  |
|  2 | ???  |
+----+------+
```


### 설정파일 변경하기
- `/etc/mysql/my.cnf` 파일 변경하기

![[assets/posts/20170509/1.PNG]]

- 저의 경우 link파일이었기 때문에 원본 파일을 찾아 작성하였습니다.

![[assets/posts/20170509/2.PNG]]

- 추가 해줘야 할 내용

```
[client]
default-character-set=utf8

[mysql]
default-character-set=utf8


[mysqld]
collation-server = utf8_unicode_ci
init-connect='SET NAMES utf8'
character-set-server = utf8
```
![[assets/posts/20170509/3.PNG]]

> 주의할 점은 기존의 만들어져있던 Database나 Table들의 Character-Set이 변경되는 것이 아니기 때문에 직접 변경을 해줘야 한다.

``` sql
ALTER DATABASE [DB명] DEFAULT CHARACTER SET utf8;
```

### 현재 Character-Set 확인하기
- `show variables like ‘c%’`
- `status`

![[assets/posts/20170509/4.PNG]]

### MySQL 재시작하기
- `service mysql restart`
