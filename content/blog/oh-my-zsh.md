---
aliases: [/articles/2017-03/ZSH]
comments: false
date: 2017-03-18
description: 
tags: [Mac, 개발환경]
title: oh-my-zsh 설치 및 적용하기
---
# oh-my-zsh 설치 및 적용하기
## 터미널모양을 바꿔보자 :)

![[assets/posts/20170318/Title.PNG]]

## oh-my-zsh 설치하기

#### 1. 현재 설치되어 있는 쉘(Shell) 확인하기

```shell
$ cat /etc/shell
```

![[assets/posts/20170318/1.PNG]]

#### 2. ZSH 버젼(Version)확인하기

```shell
$ zsh --version
```

#### 3. Brew 설치하기

```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### 4. ZSH 최신 버젼(Version) 설치하기

```shell
$ brew install zsh
```

#### 5. oh-my-zsh 설치하기

- oh-my-zsh Site = <http://ohmyz.sh/>

- Site Install code

![[assets/posts/20170318/2.PNG]]

```shell
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

- 설치 완료 후 모습

![[assets/posts/20170318/3.PNG]]

## 테마 적용하기
- Theme 미리보기 :  <https://github.com/robbyrussell/oh-my-zsh/wiki/External-themes>

- 저는 **agnoster** 를 적용하였습니다.

```shell
$ vim ~/.zshrc
$ ZSH_THEME="agnoster"
```

- random으로 하면 테마가 랜덤으로 바뀐다.

![[assets/posts/20170318/4.PNG]]

- 변경한 내용 적용하기

```shell
$ source ~/.zshrc
```

- 적용 후 모습

![[assets/posts/20170318/5.PNG]]

## 테마 색깔 적용하기
- 테마 다운로드 하기
 > Theme Site : <http://iterm2colorschemes.com/>

- 테마 가져오기
 > 터미널의 환경설정(Command + ,)

![[assets/posts/20170318/6.PNG]]

- 다운로드한 테마에서 가져오기

![[assets/posts/20170318/7.PNG]]

- 저는 **Solarized Black** 을 가져와 적용하였습니다.

![[assets/posts/20170318/8.PNG]]

- 적용한 모습

![[assets/posts/20170318/9.PNG]]

## 깨진 폰트 수정하기

![[assets/posts/20170318/10.PNG]]

- 특수문자 확인하기

```shell
echo "\ue0b0 \u00b1 \ue0a0 \u27a6 \u2718 \u26a1 \u2699"
```

![[assets/posts/20170318/11.PNG]]

- 폰트 다운로드 받기 : [Site](https://github.com/powerline/fonts/blob/master/Meslo/Meslo%20LG%20M%20DZ%20Regular%20for%20Powerline.otf)

- 다운로드한 폰트로 변경하기

![[assets/posts/20170318/12.PNG]]

![[assets/posts/20170318/13.PNG]]

![[assets/posts/20170318/14.PNG]]

![[assets/posts/20170318/15.PNG]]

- 결과 확인하기

![[assets/posts/20170318/16.PNG]]

## Intellij 터미널에 적용하기

- Shell Path 변경하기

![[assets/posts/20170318/17.PNG]]

- 적용한 모습

![[assets/posts/20170318/18.PNG]]

## PS이름 바꾸기

- 테마 변경하기
![[assets/posts/20170318/19.PNG]]

```shell
$ cd ~/.oh-my-zsh/themes
$ vim 사용하고있는 theme 이름.zsh-theme
```

![[assets/posts/20170318/20.PNG]]

- promt_context()안에 내용 변경하기

![[assets/posts/20170318/21.PNG]]

```shell
$USER@%m // 유저이름과 머신 이름
//편하게 바꾸시면 됩니다.
```

- 적용화면

![[assets/posts/20170318/22.PNG]]



## 참조
- <http://thdev.tech/mac/2016/05/01/Mac-ZSH-Install.html>
