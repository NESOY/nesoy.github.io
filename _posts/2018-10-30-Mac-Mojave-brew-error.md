---
layout: post
title: Mac 모하비 brew 에러 해결하기
categories:
  - Mac
excerpt: ' '
tags::
  - Mac

date: 2018-10-30
---


## 문제 발생..🔥
- 기분 좋게 Mojave로 update한 이후에 brew가 말을 듣지 않는다..

![No Image](/assets/posts/20181030/1.png)

### Error Message
```shell
Updating Homebrew...
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Error: Failure while executing; `git config --local --replace-all homebrew.private true` exited with 1.
```

## 해결 방법

```shell
$ xcode-select --install
```

![No Image](/assets/posts/20181030/2.png)

## 다시 시도해 보면..? 🧐

![No Image](/assets/posts/20181030/3.png)


## Reference
- <https://github.com/Linuxbrew/homebrew-core/issues/8230>
