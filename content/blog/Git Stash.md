---
aliases: [/articles/2017-03/Git-Stash]
comments: false
date: 2017-03-01
description: 
tags: [Git]
title: Git Pull 충돌 오류시 해결방법
---
# Git Stash
## 들어가며

> 다른 사람들과 협업을 하던 도중에 git pull을 통해 Project를 동기화하려고 했는데 Error Message가 발생하여 해결하기 위해 Git stash에 대해 알아보았다. 많은 사람들이 이 기능을 보면 쉽게 충돌 에러를 피할 수 있을 것 같아 포스트를 한다.

## Git Pull 충돌 오류시 해결방법

## 1. Error Message

- git pull을 하였을 때 충돌되는 파일(File)들이 존재하기에 Error가 발생된다.

```shell
Updating dab9a8b..b49cd63
error: Your local changes to the following files would be overwritten by merge:
        bundle.gradle // 충돌난 파일(File)
Please, commit your changes or stash them before you can merge.
Aborting
```

## 2. Git Stash를 활용하여 충돌 해결하기
- git stash란 unstaged 파일들을 임시 저장하고 HEAD의 상태로 백업을 하는 것입니다.
- 임시저장하는 것이기 때문에 다시 불러와서 적용을 할 수 있다.

## 3. Stash 따라하기

### 3.1 파일 변경하기
-  출력으로 Test

![[assets/posts/20170301/1.PNG]]

### 3.2 Git Status 확인하기
- unstaged에 파일이 올라가 있는 모습확인

![[assets/posts/20170301/2.PNG]]

### 3.3 Stash 사용하기
- 명령어

```shell
$ git stash
```

![[assets/posts/20170301/3.PNG]]

### 3.4 변경할 파일 다시 확인해보기

![[assets/posts/20170301/4.PNG]]

### 3.5 현재 등록된 Stash 확인하기
- 명령어

```shell
$ git stash list
```

![[assets/posts/20170301/5.PNG]]

### 3.6 저장된 Stash 다시 적용하기
- 명령어

```shell
$ git stash pop
```

![[assets/posts/20170301/6.PNG]]

### 3.7 파일 다시 확인해보기

![[assets/posts/20170301/7.PNG]]


## 결론
> 다른 사람들과 협력을 할때 pull을 통해 프로젝트를 동기화 하는 부분에서 충돌이 발생할 경우에 stash를 활용하면 쉽고 빠르게 Merge를 하여 프로젝트를 진행할 수 있을 것 같다. 앞으로 자주 사용해 보자.


## Reference
- <https://blog.outsider.ne.kr/788>
