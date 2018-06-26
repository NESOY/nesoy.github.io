---
layout: post
title: Java equals()와 hashCode()에 대해
categories:
  - Java
excerpt: ' '
tags:
  - Java

date: 2018-06-26
---


![No Image](/assets/logo/Java.jpg)


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

![No Image](/assets/posts/20180626/1.png)

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

![No Image](/assets/posts/20180626/2.png)


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
![No Image](/assets/posts/20180626/3.png)

## 어떻게(How) hashCode()는 결정되는걸까요?

### Object의 hashCode()

![No Image](/assets/posts/20180626/4.png)

### String의 hashCode()

![No Image](/assets/posts/20180626/5.png)



## Reference
- <https://blog.weirdx.io/post/3113>
- <https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html>
- <https://stackoverflow.com/questions/299304/why-does-javas-hashcode-in-string-use-31-as-a-multiplier>
- <https://johngrib.github.io/wiki/Object-hashCode/#%EA%B7%B8%EB%9F%B0%EB%8D%B0-%EC%99%9C-31%EC%9D%84-%EA%B3%B1%ED%95%98%EB%8A%94-%EA%B1%B8%EA%B9%8C>

