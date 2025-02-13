---
title: Intellij Grep Console Plugin
tags:
  - Intellij
date: 2018-04-15
aliases: 
  - ../articles/2018-04/Intellij-grepcode
---

![[Assets/logo/Intellij.png]]

> Intellij로 개발하는 과정에서 Log Framework를 사용하여 Debug Msg를 보게 되었습니다. 특정 Msg를 보고 싶었는데 어려움이 있었고 Console의 특정 Msg를 Grep하는 Plugin을 찾아 공유합니다.

![[Assets/posts/20180415/6.png]]

# Intellij Grep Console Plugin

## Install Plugin

### 1. plugins
![[Assets/posts/20180328/2.png]]
- Mac : Command + Shift + A -> `plugins`
- Window : Ctrl + Shift + A -> `plugins`

### 2. `Browse repositories`을 클릭합니다.
![[Assets/posts/20180328/3.png]]


### 3. `Grep Console`을 검색하여 다운받습니다.
![[Assets/posts/20180415/1.png]]


## How to Use

### Console에 오른쪽 버튼을 누르면 Grep을 누르시면 됩니다.
![[Assets/posts/20180415/2.png]]

### 정규표현식을 입력하여 Apply 하시면 됩니다.
![[Assets/posts/20180415/4.png]]

### 색깔을 변경하고 싶은 경우
- `Preference -> Other Setting` -> Grep Console에서 변경 가능합니다.
![[Assets/posts/20180415/5.png]]

- 빨간색 : #FF6464
- 노란색 : #FCFF77

## Reference
- <https://plugins.jetbrains.com/plugin/7125-grep-console>

