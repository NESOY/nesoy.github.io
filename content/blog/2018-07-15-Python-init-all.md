---
title: Python의 __init__, __all__ 란?
tags:
  - Python
date: 2018-07-15
aliases: 
  - ../articles/2018-07/Python-init-all
---

![[Assets/logo/python.png]]

## 들어가며
> Python으로 개발하던 과정에서 패키지가 다른 경우 참조하지 못하는 문제가 발생하였고 그 과정에서 `__init__.py`를 통해 해결하였습니다. `__init__.py`에 정리하기 위해 작성합니다.

## `__init__.py`란?
- `__init__.py` 파일은 해당 디렉터리가 패키지의 일부임을 알려주는 역할을 합니다.
- 디렉터리에 `__init__.py` 파일이 없다면 패키지로 인식되지 않을 수도 있습니다.

### Example
- src 디렉토리에 `todo.py`, tests 디렉토리에 `test_todo.py`가 존재하지만 pytest 결과 실패하였습니다.

![[Assets/posts/20180715/1.png]]

#### Pylint 화면

![[Assets/posts/20180715/2.png]]

#### Pytest 결과화면

![[Assets/posts/20180715/3.png]]

### __init__.py 생성 후 모습
![[Assets/posts/20180715/4.png]]

#### Pytest 결과화면
![[Assets/posts/20180715/5.png]]



## `__all__`란?
- 특정 디렉터리의 모듈을 `*`를 이용하여 import할 때에는 다음과 같이 해당 디렉터리의 `__init__.py` 파일에 `__all__`이라는 변수를 설정하고 import할 수 있는 모듈을 정의해 주어야 합니다.
- `__all__`로 정의하지 않으면 인식되지 않습니다.

### Example
```python
>>> from game.sound import *
>>> echo.echo_test()
Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
NameError: name 'echo' is not defined
```

#### `__all__` 정의
```python
# __init__.py
__all__ = ['echo']
```

#### 결과화면
```python
>>> from game.sound import *
>>> echo.echo_test()
echo
```



## Reference
- <https://wikidocs.net/1418#9595all9595>
