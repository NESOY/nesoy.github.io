---
aliases: [/articles/2018-09/Git-Flow]
comments: false
date: 2018-09-04
description: 
tags: []
title: Git-flow에 대해
---
# Git-flow에 대해
## Git-Flow란?
- git-flow는 전략적으로 관리하는 Git을 쉽고 편하게 도와주는 도구입니다 :)

## How to install?
```shell
brew install git-flow
```

## How to use?
### 초기화
- 기본적으로 `develop` Branch가 생성됩니다.

#### 명령어

```shell
git flow init
```

#### 결과화면

![[assets/posts/20180904/1.png]]

![[assets/posts/20180904/2.png]]


### 기능 개발하기

![[assets/posts/20180904/3.png]]

- 새 기능의 개발은 `develop` 브랜치에서 시작합니다.
- 이것은 'develop'에 기반한 새 기능(feature) 브랜치를 생성하고 그 브랜치로 전환합니다.


#### 명령어

```shell
git flow feature start MYFEATURE
```

#### 결과화면

![[assets/posts/20180904/4.png]]

### 기능 완료하기
![[assets/posts/20180904/5.png]]

- MYFEATURE 브랜치를 `develop`에 병합(merge)합니다.
- Feature 브랜치를 삭제합니다.
- `develop` 브랜치로 Check-out합니다.

#### 명령어

```shell
git flow feature finish MYFEATURE
```

#### 결과화면

![[assets/posts/20180904/7.png]]

- Rebase로 Merge하는 것을 확인할 수 있습니다.

![[assets/posts/20180904/8.png]]

### 기능 Release 시작하기
- `develop` 브랜치로부터 `release` 브랜치를 생성합니다.

![[assets/posts/20180904/9.png]]

#### 명령어

```shell
git flow release start v.0.0.1
git flow release publish v.0.0.1
```

#### 결과화면

![[assets/posts/20180904/10.png]]

### 기능 Release 완료하기

![[assets/posts/20180904/11.png]]

- `release` 브랜치를 `master` 브랜치에 병합(merge)
- 릴리스를 릴리스 이름으로 태그(tag)
- 릴리스를 `develop` 브랜치로 재병합(back-merge)
- `release` 브랜치 삭제


#### 명령어

```shell
git flow release finish v.0.0.1
```

#### 결과화면

![[assets/posts/20180904/12.png]]

## Reference
- <https://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html>
