---
title: Python Basic
tags:
  - Python
date: 2018-01-02
aliases: 
  - ../articles/2018-01/Python-Basic
---

![[Assets/posts/20180102/python-logo.png]]
# 문법
## if
```python
a = 3

if a>1:
  print(' a is greater than 1')
```

## for
```python
for a in [1,2,3]:
  print(a)
```

## while
```python
i = 0

while i<3:
  i = i+1
  print(i)
```

## Function
```python
def sum(a,b):
  return a+b

print(sum(1,5))
```

## Comment
```python
# Line Comment

"""
Block
Comment
"""
```

# Data Type

## 숫자
```python
# 정수
a = 123
a = -178
a = 0

# 실수
a = 1.2
a = -3.45

# 8진수
a = 0o177
# 16진수
a = 0x8ff

# 복소수
a = 1+2j

# ** 제곱 연산자
a = 3
b = 4
a ** b # 3의 4승 = 81

# % 나머지 연산자
7 % 3 # = 1
3 % 7 # = 3

# / 연산자
7 / 4 # = 1.75

# // 연산자
7 // 4 # = 1 몫을 가져온다.
```

## 문자열
```python
food = "Python's favorite food is perl" # 작은 따옴표 포함
say = '"Python is very easy" he says. ' # 큰 따옴표 포함

# 문자열 더하기
head = "Python"
tail = "is fun!"

head + tail # Python is fun!

# 문자열 곱하기
head * 2 # PythonPython

print("="*20)
print("My Program")
print("="*20)
# =======================
# My Program
# =======================

a = "Life is so Cool"
a[0] # L
a[-1] # l 뒤에서부터 세어 첫 번째가 되는 문자를 의미.
a[-4] # C

# 문자열 Slice
a[0:4] # [시작 : 끝 Index] -> Life

# 문자열 Formatting
"I eat %d apples." % 3 # I eat 3 apples
"I eat %s apples." % "five" # I eat five apples
"I eat %d %s apples." % (3, "five") # I eat 3 five apples

# 문자열 관련 함수들
a = "hobby"

# 개수 세기 # 2
a.count('b')

# 문자열에서 b가 처음 나온 위치 없으면 -1 # 2
a.find('b')
a.index('b')

# 문자열 삽입
a = ','
a.join('abcd') # 'a,b,c,d'

# 대문자 소문자
a = hi
a.upper() # HI
a.lower() # hi

# trim
a.rstrip() # 오른쪽 공백 지우기
a.lstrip() # 왼쪽 공백 지우기
a.strip() # 공백 지우기

# replace
a = "Life is too short"
a.replace("Life", "Your Leg") # Your Leg is too short

# split
a.split() # 공백 기준 문자열 나눔
```

# 리스트 자료형

> 리스트명 = [요소1, 요소2, 요소3, ...]

```python
# 리스트의 Indexing
a = [1,2,3]
a[0] # 1
a[1] # 2
a[2] # 3
a[-1] # 3

# 리스트의 슬라이싱
a = [1,2,3,4,5]
a[0:2] # [1,2]
b = a[:2] # 처음부터 1까지
c = a[2:] # 1부터 끝까지

# 리스트 더하기
a = [1,2,3]
b = [4,5,6]
a + b # [1,2,3,4,5,6]

# 리스트 반복하기(*)
a = [1,2,3]
a * 3 # [1,2,3,1,2,3,1,2,3]

# 리스트 수정 변경 삭제
a = [1,2,3]
a[2] = 4
a # [1,2,4]
a[1:2] = ['a','b']
a # ['1','a','b','3']
a[1:3] = []
a # [1,3]
del a[1]
a # [3]

# 리스트 추가
a = [1,2,3]
a.append(4) # 리스트의 맨 마지막에 4를 추가
a # [1,2,3,4]
# 리스트 정렬
a.sort()
a.reverse() # 역정렬
# 요소 위치 반환
a.index(3)
# 요소 삽입
a.insert(0,4) # 0번째 4삽입
# 요소 삭제
a.remove(3) # 첫번째로 나오는 x를 삭제하는 함수

a.pop() # stack의 pop형태
a.count(x) # x의 포함 개수
a = [1,2,3]
a.extend([4,5])
a # [1,2,3,4,5]
```

# 튜플 자료형
`리스트`는 []로 둘러싸지만 `튜플`은 ()으로 둘러싼다.
`리스트`는 생성,삭제,수정 가능하지만 `튜플`은 그 값을 바꿀 수 없다.

```python
t1 = (1,) # 요소 뒤에 콤마(,)를 반드시 붙여야 한다는것.
t4 = 1,2,3 # 괄호() 생략해도 무방하다는 점.

# 인덱싱
t1 = (1,2,'a','b')
t1[0] # 1
# 슬라이싱
t1[1:] # 1부터 끝까지
# 튜플 더하기 곱하기
t2 = (3,4)
t1 + t2 # (1,2,'a','b',3,4)
t2 * 3 # (3,4,3,4,3,4)
```

# 딕셔너리 자료형
```python
a = {1:'hi'}
# 삭제
del a[1] # key가 1인 key:value쌍 삭제

a.keys() # key 리스트 가져오기
a.values() # value 리스트 가져오기
a.items() # key, value 쌍 얻기
a.clear() # key, value 쌍 모두 지우기

a.get(1) # key로 value 얻기
```

# 집합 자료형
중복을 허용하지 않는다.
순서가 없다.
```python
s1 = set([1,2,3]) # {1,2,3}
s2 = set("Hello") # {'e','l', 'o', 'H'}

# 교집합
s1 & s2
s1.intersection(s2)

# 합집합
s1 | s2
s1.union(s2)

# 차집합
s1 - s2
s1.difference(s2)

s1.add(4) # 값 1개 추가하기
s1.update([4,5,6]) # 값 여러개 추가하기
s1.remove(4) # 값 제거하기
```
