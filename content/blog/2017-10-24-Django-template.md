---
title: Django 튜토리얼3
tags:
  - Django
  - Python
date: 2017-10-24T00:00:00.000Z
aliases: 
  - ../articles/2017-10/Django-template
---

![[Assets/posts/20171021/django.png]]

# Django Template

- `setting.py` : `APP_DIRS`: `True`로 설정하기.
- 만든 App 안에 `App이름/templates/app이름`의 폴더 생성

  > App이름/emplate/App이름 라고 만들 필요 없이, 그냥 App이름/templates에 넣어도 되지 않을까? 만약 동일한 template 이름이 다른 어플리케이션에 있을 경우 Django 는 이 둘간의 차이를 구분하지 못합니다.

![[Assets/posts/20171024/1.png]]

# 404 Error

## 기존 방식.

```python
try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, 'polls/detail.html', {'question': question})
```

## 조금 더 편한 방법.

```python
from django.shortcuts import get_object_or_404, render

from .models import Question
# ...
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    # get_list_or_404() : list Check
    return render(request, 'polls/detail.html', {'question': question})
```

# Template 에서 하드코딩된 URL 을 제거하기

> URL이 변경되면 URL을 포함한 코드를 전부 변경해야하는 문제점을 해결하기 위해 제거한다.

## 강결합 코드

### html

```html
<li><a href="/memos/{{ memo.id }}/">{{ memo.content }}</a></li>
```

## 약결합 코드

```python
    (r'^memos/(?P<memo_id>[0-9]+)/$', views.detail, name='detail')
```

### html

![[Assets/posts/20171024/2.png]]

## URL 구역나누기

> 다른 App의 URLS.py를 사용하기 위해

```python
app_name = 'memos' # App 이름 선언
```

### html

![[Assets/posts/20171024/3.png]]

# Reference

- <https://docs.djangoproject.com/ko/1.11/intro/tutorial03/>
