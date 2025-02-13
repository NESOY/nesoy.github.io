---
title: Syntatic Sugar
date: 2019-12-04
aliases: [../articles/2019-12/Syntactic-sugar]
category:
  - "[[2018 생각 정리]]"
---
# Syntatic Sugar
- 프로그래밍 언어 차원에서 제공되는 논리적으로 간결하게 표현하는 것
- 중복되는 로직을 간결하게 표현하기 위해 나타나게 되었다.

#### [원문](https://www.quora.com/What-is-syntactic-sugar-in-programming-languages)
> Syntactic sugar, or syntax sugar, is a visually or logically-appealing "shortcut" provided by the language, which reduces the amount of code that must be written in some common situation.


## 이해를 돕기 위한 Example

#### Suger가 부족한 표현
```c#
int a;
if(SomeFunction() == 2)
   a = 4;
else
   a = 9;
```

#### 간결하게 표현하기 위해 노력하는 엔지니어의 방법
- 해당 함수를 만들고 사용하는 방식

```c#
public T Iif<T>(bool condition, T ifTrue, T ifFalse)
{
   if(condition) return ifTrue;
   return ifFalse;
}
...
//usage
int a = Iif(SomeFunction() == 2, 4, 9);
```

#### 하지만 언어차원에서 제공되는 Syntatic Sugar
- 삼항 연산자
```c#
int a = SomeFunction() == 2 ? 4 : 9;
```


## 몇가지 Syntatic Sugar Example
### Compound Assignment Operators
#### Not Syntatic Sugar
```java
x = x + 5;
```
#### Syntatic Sugar
```java
x += 5;
x++;
++x;
--x;
```

### Ternary Operator
#### Not Syntatic Sugar
```java
bool passed;
if (mark >= 50) {
    passed = true;
} else {
    passed = false;
}
```

#### Syntatic Sugar
```java
bool passed = mark >= 50 ? true : false;
```

### Switch statement
#### Not Syntatic Sugar
```java
if (letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u') {
	puts("Letter IS a vowel");
} else {
	puts("Letter is NOT a vowel");
}
```

#### Syntatic Sugar
```java
switch (letter) {
case 'a': case 'e': case 'i': case 'o': case 'u':
	puts("Letter IS a vowel");
	break;
default:
	puts("Letter is NOT a vowel");
}
```

### for loops (C-style)
#### Not Syntatic Sugar
```c
i = 0;
while (i < num_rows) {
	j = 0;
	while (j < num_cols) {
		matrix[i][j] = 1;
		j++;
	}
	i++;
}
```

#### Syntatic Sugar
```c
for (i = 0; i < num_rows; i++) {
	for (j = 0; j < num_cols; j++) {
		matrix[i][j] = 1;
	}
}
```



## Reference
