---
title: Django 시작하기
tags:
  - Django
  - Python
date: 2017-10-21
aliases: 
  - ../articles/2017-10/Django-Start
---

![[Assets/posts/20171021/django.png]]

## Django란?
> The web framework for perfectionists with deadlines.

- Python의 Web Framework이다.
- 엄청 빠르고.. 보안이 철저하며.. 확장성 또한 높다.

## 시작하기
### 가상환경(Virtual environment)
- why? 각 파이썬 버젼과 패키지의 의존성 문제를 해결하기 위해.
- 설치하기 : [Link](https://gmlwjd9405.github.io/2017/10/13/how-to-use-pyenv-virtualenv-autoenv.html)

#### Python 3.5.2 설치하기

```
$ pyenv install 3.5.2
```

#### Pyenv 3.5.2 가상환경 만들기 & 활성화하기

```
$ pyenv virtualenv 3.5.2 nemo
$ pyenv activate nemo
```

![[Assets/posts/20171021/pyenv-activate.png]]

#### autoenv 가상화 자동화하기

```
echo “+++++++++++++++++++++++++++++++++++++++++++++++”
echo "Nemo Virtual Env"
echo “+++++++++++++++++++++++++++++++++++++++++++++++”
pyenv activate nemo
```

![[Assets/posts/20171021/autoenv-result.png]]

### django 설치하기

#### Installing an official release with pip
```
$ pip install Django // 설치
$ python -m django --version //확인
```

### django 프로젝트 만들기

#### Install Code
```
$ django-admin startproject nemo
```

#### Project Tree
![[Assets/posts/20171021/django-project.png]]

- `manage.py`: Django 프로젝트와 다양한 방법으로 상호작용 하는 커맨드라인의 유틸리티 입니다.
- `__init__.py`: Python 으로 하여금 이 디렉토리를 패키지 처럼 다루라고 알려주는 용도의 단순한 빈 파일입니다.
- `settings.py`: 현재 Django project 의 환경/구성을 저장합니다. Django settings 에서 환경 설정이 어떻게 동작하는지 확인할 수 있습니다.
- `urls.py`: 현재 Django project 의 URL 선언을 저장합니다. URL dispatcher 역할.
- `wsgi.py`: 현재 project 를 서비스 하기 위한 WSGI 호환 웹 서버의 진입점 입니다.

### django 동작하기
```
$ python manage.py runserver
```

#### 결과화면
![[Assets/posts/20171021/django-runserver.png]]

## Reference
- <https://docs.djangoproject.com/ko/1.11/intro/tutorial01/>
- <https://gmlwjd9405.github.io/2017/10/13/how-to-use-pyenv-virtualenv-autoenv.html>
