---
title: Mac 터미널 셋팅하기.
tags:
  - 개발환경
  - Mac
date: 2018-01-13
aliases: 
  - ../articles/2018-01/Mac-Terminal
---

# Homebrew
- homebrew는 맥용 패키지 매니저입니다.
- 설치하시면 매우매우 편합니다. 꼭 설치하세요.

## 설치하기
```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 확인하기
```shell
# brew test
$ brew doctor
Your system is ready to brew.
```

# Git
- `git` : 버젼관리시스템
- `git-lfs` : Git Large File Storage로 용량이 큰 바이너리 파일을 git으로 관리할 때 유용

## 설치하기
```shell
brew install git git-lfs
```

## 설정하기
```shell
git config --global user.name "Your Name"
git config --global user.email "you@your-domain.com"
# 한글을 사용하기 위한 설정
git config --global core.precomposeunicode true
git config --global core.quotepath false
```

# iTerm2
- 기존에 터미널의 없던 기능이 많이 담긴 터미널입니다.

## 설치하기
```shell
brew cask install iterm2
```
## 테마적용하기
- snazzy 테마

![[Assets/posts/20180113/snazzy.png]]

- 파일명 : `Snazzy.itermcolors`
- 내용 : [Link](https://raw.githubusercontent.com/sindresorhus/iterm2-snazzy/master/Snazzy.itermcolors)
- 다른 테마 : <http://iterm2colorschemes.com/>

- `⌘ + ,`로 환경설정에 들어간 이후에 `Profiles`에 들어갑니다.
- `Color Presets`에 `Snazzy`를 추가합니다.

![[Assets/posts/20180113/color.png]]

## 추가설정
- 타이틀바 배경색 어둡게 변경
  - `Appearance` > `Theme: Dark`
- 스크롤바 감추기
  - `Appearance` > `Hide scrollbars: 체크함`
- 타이틀바 밑에 1px 라인 제거
  - `Appearance` > `Show line under title bar when the tab bar is not visible: 체크 안함`
- 마진 수정
  - `Advanced` > `Height of top and bottom margins in terminal panes`: 10
  - `Advanced` > `Width of left and right margins in terminal panes`: 12

# zsh with oh-my-zsh
- 기존의 `bash`쉘 말고 `zsh`쉘을 통해 다양한 플러그인을 사용할 수 있습니다.

## 설치하기
### zsh 설치
```shell
brew install zsh zsh-completions
```
### oh-my-zsh 설치
```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
## 플러그인
- `zsh-syntax-highlighting` : 명령어 하이라이팅
- ` zsh-autosuggestions` : 자동완성 플러그인

```shell
# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# zsh-autosuggestions
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

## 설정하기
- 플러그인을 설치하면 `~/.zshrc`파일을 설정해야 합니다.

```shell
plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
)
```

# oh-my-zsh 테마 적용하기
-  `pure prompt` : <https://github.com/sindresorhus/pure>

## 설치하기
```shell
brew install nodejs # nodejs가 설치되어 있다면 skip
npm install --global pure-prompt
```

## 설정하기
- `~/.zshrc`에 내용을 추가합니다.

```shell
autoload -U promptinit; promptinit
prompt pure
```

# SCM Breeze
> Git의 내용에 번호를 부여하여 쉽게 사용하기 위한 도구.

- 최지훈님의 소개글 : <https://cjh5414.github.io/git-habit/>
- SCM Breeze : <https://github.com/scmbreeze/scm_breeze>

## 설치하기
```shell
git clone git://github.com/scmbreeze/scm_breeze.git ~/.scm_breeze
~/.scm_breeze/install.sh
source ~/.bashrc   # or source ~/.zshrc
```

## 적용 전 모습
![[Assets/posts/20180113/pre-scm-breeze.png]]
## 적용 후 모습
- 번호로 관리할 수 있는 장점이 있다.
![[Assets/posts/20180113/scm-breeze.png]]

# Reference
- <https://subicura.com/2017/11/22/mac-os-development-environment-setup.html>
