---
title: Java transient이란?
tags: [Java]
date: 2018-06-10
aliases: [../articles/2018-06/Java-transient]
---
![[Assets/logo/Java.jpg]]

# 들어가며
- `transient`키워드를 이해하기 위해서는 Serialize에 대한 이해가 필요합니다.
- <https://nesoy.github.io/articles/2018-04/Java-Serialize>

# Java transient이란?
- `transient`는 Serialize하는 과정에 제외하고 싶은 경우 선언하는 키워드입니다.

## 왜(Why) 필요할까요?
- 패스워드와 같은 보안정보가 직렬화(Serialize) 과정에서 제외하고 싶은 경우에 적용합니다.
- 다양한 이유로 데이터를 전송을 하고 싶지 않을 때 선언할 수 있습니다.

## Example

### Model
```java
class Member implements Serializable {
    private String name;
    private String email;
    private int age;

    public Member(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
    @Override
    public String toString() {
        return String.format("Member{name='%s', email='%s', age='%s'}", name, email, age);
    }
}
```

### Main

```java
  public static void main(String[] args) throws IOException, ClassNotFoundException {
        Member member = new Member("김배민", "deliverykim@baemin.com", 25); // Model 객체
        String serialData = serializeTest(member); // 직렬화
        deSerializeTest(serialData);    // 역직렬화
    }
```

### Result
- 아래의 이미지 처럼 직렬화가 잘 된 것을 확인할 수 있습니다.
![[Assets/posts/20180610/1.png]]


### 이름에 transient keyword를 추가하면 어떨까요?

![[Assets/posts/20180610/2.png]]

- 결과를 확인해 보니 field는 유지되지만 null값이 대입되는 것을 확인할 수 있었습니다.

![[Assets/posts/20180610/3.png]]


## 주의해야할 점은 없을까요?
- 적용하는 Data에 대해 이해가 필요합니다.
    - 실제로 필요가 없는지에 대한 고려.
    - Data를 제외하였을 경우에 서비스 장애에 이상이 없는지에 대한 고려.



## Reference
- <https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.3.1.4>
