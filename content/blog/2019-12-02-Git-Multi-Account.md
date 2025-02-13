---
title: Git 계정 여러개 사용하기
tags:
  - Git
date: 2019-12-02
aliases: 
  - ../articles/2019-12/Git-Multi-Account
---

## Git 계정 여러개 사용하기

#### Global Git config 확인 하기
- `vi ~/.gitconfig`에서 설정을 추가하면 된다.
- 아래 설정들은 Global Scope로 적용된다.
```
[core]
	precomposeunicode = true
	quotepath = false
[user]
	name = Kwon Young Jae
	email = kyoje11@gmail.com
```

#### 특정 Directory에 Git config 설정 하기
- `vi ~/.gitconfig`에 아래 내용을 추가한다.
- Directory 위치는 `~/Desktop/private` 아래에 해당한다.
```
[includeIf "gitdir:~/Desktop/private/"]
	path = .gitconfig-private
```

#### ~/.gitconfig-private 파일 생성하기
- `vi ~/.gitconfig-private`
```
[user]
	name = nesoy
	email = kyoje11@kakao.com
```

#### 설정된 Config 확인하기
- `private Directory`에 들어가서 `git init`을 하면 설정된 name과 email이 반영된 것을 확인할 수 있다.


## Reference
