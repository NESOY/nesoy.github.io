---
aliases: [/articles/2017-04/MongoDB]
comments: false
date: 2017-04-02
description: 
tags: [MongoDB]
title: MAC OS에서 MongoDB 설치하기
---
# MongoDB
### 1. Homebrew 설치
- `ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go/install)"`

### 2. Brew를 통한 MongoDB설치하기
- `brew install mongodb`

![[assets/posts/20170402/2.PNG]]

## MongoDB 환경 셋팅
### 3. 데이터베이스 저장할 폴더 만들기
- `mkdir -p /data/db`

![[assets/posts/20170402/3.PNG]]

### 4. 권한 부여하기
- `chown $USER /data/db`

### 5. mongod 활성화하기
- `mongod`
![[assets/posts/20170402/4.PNG]]

### 6. mongo shell 접속하기
- 새로운 터미널을 연다음 mongo shell을 접속한다.
- `mongo`
![[assets/posts/20170402/5.PNG]]

## Reference
- <https://www.mongodb.com/>
