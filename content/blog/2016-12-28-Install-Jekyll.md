---
title: Jekyll 설치하기
date: 2016-12-28
aliases: 
  - ../articles/2016-12/Install-Jekyll
---
# Jekyll 설치하기(Window)
![[Assets/posts/20161228/jekyll_logo.png]]

## Jekyll

- #### Jekyll은 여러 형태의 텍스트와 소스들로 구성 정적 파일들을 웹사이트로 생성시켜주는 툴.

- #### GitHub Pages 에서도 이용, 개인블로그도 생성 가능
  - #### [https://jekyllrb-ko.github.io/](https://jekyllrb-ko.github.io/)

## 1. 필요한 Software
- #### Ruby(ruby, DevKit)
- #### Jekyll -> **Ruby 기반**
- #### Python(Setuptool,pip,Pygments) -> **Pygments은 Python 기반**
- #### rouge

## 2. Ruby 설치하기
- #### [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)

- #### PC환경에 맞게 Download
![[Assets/posts/20161228/ruby_down.PNG]]
- #### 환경변수에 자동으로 넣어주는 Option Check
![[Assets/posts/20161228/ruby_path.PNG]]

- ### DevKit 설치하기
  - #### [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)

- #### PC환경에 맞게 Download
![[Assets/posts/20161228/ruby_devkit.PNG]]

- #### DevKit 디렉토리 만들기
  - #### C:\RubyDevkit

- #### CMD창에서 Devkit 초기화 하기
  - #### cd C:\RubyDevkit
  - #### ruby dk.rb init  
  - #### ruby dk.rb install

  - #### 성공화면
  ![[Assets/posts/20161228/ruby_success.PNG]]

## 3. Jekyll 설치하기
- #### gem을 이용하여 Jekyll 설치하기 (권한 요청하면 주기)
  - #### gem install jekyll

  - ##### 성공화면
 ![[Assets/posts/20161228/jekyll_down.PNG]]

  미리설치한 관계로 숫자가 적지만 원래 더 많습니다.

- #### rouge 설치하기
  - #### gem install rouge

  #### 성공화면
  ![[Assets/posts/20161228/rouge_down.PNG]]

## 4. Python 설치하기
  - #### [https://www.python.org/downloads/](https://www.python.org/downloads/)

- #### PC환경에 맞게 Download
  ![[Assets/posts/20161228/python_down.PNG]]

- #### pip는 Python에 자동으로 설치된다.

- #### 환경변수추가하기
  - #### C:\Python27;C:\Python27\Scripts;
  ![[Assets/posts/20161228/path.PNG]]
  ![[Assets/posts/20161228/path2.PNG]]

  - #### python
  - #### python 성공화면
  ![[Assets/posts/20161228/python_success.PNG]]

  - #### pip

  - #### pip 성공화면
  ![[Assets/posts/20161228/pip_success.PNG]]

- #### Pygments 설치
  - #### pip install Pygments

## 5. Jekyll 실행하기
- #### Jekyll 폴더 만들기 & 명령어 실행하기
  - #### mkdir C:\jekyll
  - #### gem install wdm
  - #### jekyll
  ![[Assets/posts/20161228/jekyll_execute.PNG]]

- #### Jekyll 실행하기
  - #### jekyll serve
  - #### Browser로 접속  127.0.0.1:4000

  ![[Assets/posts/20161228/jekyll_browser.PNG]]

## 6. Jekyll 사이트 생성하기
- #### blog 디렉토리 생성
  - #### jekyll new C:\Jekyll\blog

- #### 환경설정하기 : config.yml 맨끝에 추가하기
  - #### encoding: utf-8
  - #### highlighter: rouge
  - #### highlighter: Pygments
  ![[Assets/posts/20161228/config.PNG]]

- #### Jekyll 실행하기
  - #### jekyll serve
  - #### Browser로 접속  127.0.0.1:4000
  ![[Assets/posts/20161228/jekyll_browser2.PNG]]

## 참조
<http://tech.whatap.io/2015/09/11/install-jekyll-on-windows/>
