---
layout: post
title: Intellij Code Convention 자동화하기
categories:
  - Intellij
excerpt: ' '
tags::
  - Intellij

date: 2018-09-28
---

![No Image](/assets/logo/Intellij.png)


## 들어가며
> 개발을 하면 Line 자동 정렬, import 자동 정렬 등등 매번 해줘야 하지만.. 귀찮으니 자동화해주는 plugin과 setting을 공유합니다. :D

## Save Action Plugin 사용하기
- 저장 시 Auto import, Reformat (⌥⌘L, ⌥⇧⌘L)을 자동화합니다.

### How to Install? 🧐
- <https://plugins.jetbrains.com/plugin/7642-save-actions>


![No Image](/assets/posts/20180928/1.png)

## How to use? 🎮

![No Image](/assets/posts/20180928/2.png)

### Option
- save가 발생할 경우에 Activate
- 저장 단축키를 누른 경우 Activate(CTRL + SHIFT + S)
- 컴파일 에러가 발생한 경우 DeActivate

### Formatting Option
- import 최적화
- file 재정렬
- 우선 순위에 따른 Method 정렬

### 정렬이 필요없는 파일은 어떻게 하나요?

![No Image](/assets/posts/20180928/3.png)

- exclude 파일에 추가하시면 됩니다.


## Intellij Setting하기

### 자동 import Setting
- `Editor -> General -> Auto import`

![No Image](/assets/posts/20180928/4.png)

- import 최적화 체크
- 자동 import 옵션 체크

### import간의 Space Setting
- `Editor -> Code Style -> Java`
- import Layout

![No Image](/assets/posts/20180928/5.png)

> 댓글을 통해 피드백을 남겨주시거나 광고 한번 클릭해주시면 감사하겠습니다 :)