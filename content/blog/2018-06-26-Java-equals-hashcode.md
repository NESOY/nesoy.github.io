---
title: Java equals()와 hashCode()에 대해
tags:
  - Java
date: 2018-06-26
aliases: 
  - ../articles/2018-06/Java-equals-hashcode
---


![[Assets/logo/Java.jpg]]


# Java equals()와 hashCode()에 대해
## equals()
- 두 객체의 `내용이 같은지` 확인하는 Method입니다.
## hashCode()
- 두 객체가 `같은 객체인지` 확인하는 Method입니다.


## Example

- `Nesoy`라는 클래스가 존재합니다.

```java
class Nesoy {
	private int age;
	private String name;

	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
```

- `Nesoy`로 만들어진 p1,p2를 동일한지 확인했지만 false 결과값이 나왔습니다.

```java
public static void main(String[] args){
	Nesoy p1 = new Nesoy();
	p1.setAge(27);
	p1.setName("YoungJae");

	Nesoy p2 = new Nesoy();
	p2.setAge(27);
	p2.setName("YoungJae");

	System.out.println(p1.equals(p2)); // false
}
```

### 왜(Why) 결과가 false일까요?
- Object에 정의된 equals를 확인하면 정답을 알 수 있습니다.

![[Assets/posts/20180626/1.PNG]]

- 단순히 Object의 ==로 비교하는 것을 확인할 수 있습니다.

### 어떻게(How) 값이 동일한지 비교할 수 있을까요?

- equals()를 @Override하면 문제를 해결할 수 있습니다.

```java
@Override
public boolean equals(Object obj) {

    if (obj == null) {
        return false;
    }

    if (this.getClass() != obj.getClass()) {
        return false;
    }

    if (this == obj) {
        System.out.println("Object Same");
        return true;
    }

    Nesoy that = (Nesoy) obj;

    if (this.name == null && that.name != null) {
        return false;
    }

    if (this.age == that.age && this.name.equals(that.name)) {
        System.out.println("Object Value Same");
        return true;
    }

    return false;
}
```

#### Result

![[Assets/posts/20180626/2.PNG]]


## 이런 상황은 어떨까요?
- equals()가 true인 두 Object를 HashMap에 put을 할 때 동일한 Key로 인식하고 싶은 경우

```java
Map<Nesoy, Integer> map = new HashMap<Nesoy, Integer>();
map.put(p1, 1);
map.put(p2, 1);
System.out.println(map.size()); // 2
```

### 왜(Why) 크기가 2일까요?
- Hash를 사용한 Collection(HashMap, HashTable, HashSet, LinkedHashSet등등)은 key를 결정할때 hashCode()를 사용하기 때문에 그렇습니다.

### 어떻게(How) Key 값이 동일하게 인식할 수 있을까요?
- hashCode()를 @Override하면 문제를 해결할 수 있습니다.

```java
@Override
public int hashCode() {

	final int prime = 31;
	int hashCode = 1;

	hashCode = prime * hashCode + ((name == null) ? 0 : name.hashCode());
	hashCode = prime * hashCode + age;

	return hashCode;
}
```

#### Result
![[Assets/posts/20180626/3.PNG]]

## 어떻게(How) hashCode()는 결정되는걸까요?

### Object의 hashCode()
- hashCode()로 native call을 하여 Memory에서 가진 해쉬 주소값을 출력합니다.
- 특별한 설정을 하지 않았을 경우 `System.identityHashCode()`와 동일한 값을 나타냅니다.

![[Assets/posts/20180626/4.PNG]]



### String의 hashCode()

![[Assets/posts/20180626/5.PNG]]

#### 왜(Why) 31인가요?
> 31은 소수이면서 홀수이기 때문에 선택된 값이다. 만일 그 값이 짝수였고 곱셈 결과가 오버플로되었다면 정보는 사라졌을 것이다. 2로 곱하는 것은 비트를 왼쪽으로 shift하는 것과 같기 때문이다. 소수를 사용하는 이점은 그다지 분명하지 않지만 전통적으로 널리 사용된다. 31의 좋은 점은 곱셈을 시프트와 뺄셈의 조합으로 바꾸면 더 좋은 성능을 낼 수 있다는 것이다(31 * i는 (i << 5) - i 와 같다). 최신 VM은 이런 최적화를 자동으로 실행한다.

- 소수이면서 홀수이기 때문에 선택된 것입니다.
	- 소수는 1과 자기 자신을 제외한 숫자이기 때문에 Hash하였을 경우 충돌이 가장 적은 숫자입니다.
	- 언제든지 변경될 가능성이 있다고 생각합니다.

## 정리하며
- equals()를 재정의한다면 side effect를 줄이기 위해서 hashCode()도 재정의하는것이 좋습니다.



## Reference
- <https://blog.weirdx.io/post/3113>
- <https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html>
- <https://stackoverflow.com/questions/299304/why-does-javas-hashcode-in-string-use-31-as-a-multiplier>
- <https://johngrib.github.io/wiki/Object-hashCode/#%EA%B7%B8%EB%9F%B0%EB%8D%B0-%EC%99%9C-31%EC%9D%84-%EA%B3%B1%ED%95%98%EB%8A%94-%EA%B1%B8%EA%B9%8C>

