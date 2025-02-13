---
title: Java의 직렬화(Serialize)란?
tags:
  - Java
date: 2018-04-18
aliases: 
  - ../articles/2018-04/Java-Serialize
---

![[Assets/logo/Java.jpg]]

# 들어가며
> 예전에 네트워크 통신을 할때 Serialize에 대해 공부를 한 경험이 있지만 지식의 부족함을 느끼고 조사하여 결과를 정리합니다.

# 직렬화(Serialize)란?
## 직렬화(Serialize)
- 자바 시스템 내부에서 사용되는 Object 또는 Data를 외부의 자바 시스템에서도 사용할 수 있도록 byte 형태로 데이터를 변환하는 기술.
- JVM(Java Virtual Machine 이하 JVM)의 메모리에 상주(힙 또는 스택)되어 있는 객체 데이터를 바이트 형태로 변환하는 기술

## 역직렬화(Deserialize)
- byte로 변환된 Data를 원래대로 Object나 Data로 변환하는 기술을 역직렬화(Deserialize)라고 부릅니다.
- 직렬화된 바이트 형태의 데이터를 객체로 변환해서 JVM으로 상주시키는 형태.

## 직렬화(Serialize) 시작하기
### 직렬화(Serialize) 조건
- `java.io.Serializable` 인터페이스를 상속받은 객체는 직렬화 할 수 있는 기본 조건입니다.

```java
public class Member implements Serializable {
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

### 직렬화(Serialize) 방법
- `java.io.ObjectOutputStream`를 사용하여 직렬화를 진행합니다.

```java
public static void main(String[] args){
    Member member = new Member("김배민", "deliverykim@baemin.com", 25);
    byte[] serializedMember;
    try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
        try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {
            oos.writeObject(member);
            // serializedMember -> 직렬화된 member 객체
            serializedMember = baos.toByteArray();
        }
    }
    // 바이트 배열로 생성된 직렬화 데이터를 base64로 변환
    System.out.println(Base64.getEncoder().encodeToString(serializedMember));
}
```

## 역직렬화(Deserialize) 시작하기
### 역직렬화(Deserialize) 조건
- 직렬화 대상이 된 객체의 클래스가 클래스 패스에 존재해야 하며 import 되어 있어야 합니다.
- 중요한 점은 직렬화와 역직렬화를 진행하는 시스템이 서로 다를 수 있다는 것을 반드시 고려해야 합니다.
- 자바 직렬화 대상 객체는 동일한 `serialVersionUID` 를 가지고 있어야 합니다.
    - `private static final long serialVersionUID = 1L;`
- `serialVersionUID`이 왜 필요한지 자세한 내용은 아래에 추가하였습니다 :)

### 역직렬화(Deserialize) 방법
- `java.io.ObjectInputStream`를 사용하여 역직렬화를 진행합니다.

```java
public static void main(String[] args){
    // 직렬화 예제에서 생성된 base64 데이터
    String base64Member = "...생략";
    byte[] serializedMember = Base64.getDecoder().decode(base64Member);
    try (ByteArrayInputStream bais = new ByteArrayInputStream(serializedMember)) {
        try (ObjectInputStream ois = new ObjectInputStream(bais)) {
            // 역직렬화된 Member 객체를 읽어온다.
            Object objectMember = ois.readObject();
            Member member = (Member) objectMember;
            System.out.println(member);
        }
    }
}
```



## 다른 Format의 직렬화
![[Assets/posts/20180418/1.png]]

- 직렬화방법에는 여러 Format이 존재합니다.
    - 표형태의 다량의 데이터를 직렬화할때는 CSV형태
    - 구조적인 데이터는 XML, JSON형태.

#### CSV
- 데이터를 표현하는 가장 많이 사용되는 방법 중 하나로 콤마(,) 기준으로 데이터를 구분하는 방법입니다.
> nesoy,youngjaeKwon,Seoul,Korea -> [nesoy, youngjaeKwon, Seoul, Korea]

```java
Member member = new Member("김배민", "deliverykim@baemin.com", 25);
// member객체를 csv로 변환
String csv = String.format("%s,%s,%d",member.getName(), member.getEmail(), member.getAge());
System.out.println(csv);
```
- [Apache Commons CSV](https://commons.apache.org/proper/commons-csv/)
- [opencsv](http://opencsv.sourceforge.net/)

#### JSON
- [JSON이란 무엇인가?](https://nesoy.github.io/articles/2017-02/JSON)

```java
Member member = new Member("김배민", "deliverykim@baemin.com", 25);
// member객체를 json으로 변환
String json = String.format(
        "{\"name\":\"%s\",\"email\":\"%s\",\"age\":%d}",
        member.getName(), member.getEmail(), member.getAge());
System.out.println(json);
```
- [Jackson](https://github.com/FasterXML/jackson)
- [Gson](https://github.com/google/gson)

## 자바의 직렬화 왜 사용하는가?
- 복잡한 데이터 구조의 클래스의 객체라도 직렬화 기본 조건만 지키면 큰 작업 없이 바로 직렬화, 역직렬화가 가능합니다.
- 데이터 타입이 자동으로 맞춰지기 때문에 관련 부분을 큰 신경을 쓰지 않아도 됩니다.


## 어디에 사용되는가?
### 서블릿 세션 (Servlet Session)
- 세션을 서블릿 메모리 위에서 운용한다면 직렬화를 필요로 하지 않지만, 파일로 저장하거나 세션 클러스터링, DB를 저장하는 옵션 등을 선택하게 되면 세션 자체가 직렬화가 되어 저장되어 전달됩니다.

### 캐시 (Cache)
- Ehcache, Redis, Memcached 라이브러리 시스템을 많이 사용됩니다.

### 자바 RMI(Remote Method Invocation)
- 원격 시스템 간의 메시지 교환을 위해서 사용하는 자바에서 지원하는 기술.

## 자바의 직렬화 단점?
### 역직렬화시 클래스 구조 변경 문제
- 기존 멤버 클래스를 직렬화합니다.
```java
 public class Member implements Serializable {
        private String name;
        private String email;
        private int age;
      // 생략
    }
```

- 직렬화한 Data
```java
rO0ABXNyABp3b293YWhhbi5ibG9nLmV4YW0xLk1lbWJlcgAAAAAAAAABAgAESQADYWdlSQAEYWdlMkwABWVtYWlsdAASTGphdmEvbGFuZy9TdHJpbmc7TAAEbmFtZXEAfgABeHAAAAAZAAAAAHQAFmRlbGl2ZXJ5a2ltQGJhZW1pbi5jb210AAnquYDrsLDrr7w=
```

- 멤버 클래스에서 속성을 추가합니다.
```java
public class Member implements Serializable {
        private String name;
        private String email;
        private int age;
        // phone 속성을 추가
        private String phone;
    }
```
- 직렬화한 Data를 역직렬화하면 어떤 결과가 나올까요? > 결과는 `java.io.InvalidClassException`이 발생합니다.
- 위에서 언급했던 것처럼 직렬화하는 시스템과 역직렬화하는 시스템이 다른 경우에 발생하는 문제입니다.
- 각 시스템에서 사용하고 있는 모델의 버젼 차이가 발생했을 경우에 생기는 문제입니다.

### 해결하기 위해서는
- 모델의 버젼간의 호환성을 유지하기 위해서는 `SUID(serialVersionUID)`를 정의해야 합니다.
- Default는 클래스의 기본 해쉬값을 사용합니다.

### 또 다른 문제
- `String` -> `StringBuilder`, `int` -> `long`으로 변경해도 역직렬화에서 `Exception`이 발생합니다.
- 자바 직렬화는 상당히 타입의 엄격하다는 것을 알 수 있습니다.
- 멤버 변수가 빠지게 된다면 Exception 대신 null값이 들어가는 것을 확인할 수 있습니다.

### 직렬화 Data Size 문제
```java
{"name":"김배민","email":"deliverykim@baemin.com","age":25}
serializedMember (byte size = 146)
json (byte size = 62)
```
- 아주 간단한 객체의 내용도 2배이상의 차이를 확인할 수 있습니다.
- 일반적인 메모리기반의 Cache에서는 Data를 저장할 수 있는 용량의 한계가 있기 때문에 Json 형태와 같은 경량화된 형태로 직렬화하는 것도 좋은 방법입니다.

# 정리하며
- 외부 저장소로 저장되는 데이터는 짧은 만료시간의 데이터를 제외하고 자바 직렬화를 사용을 지양합니다.
- 역직렬화시 반드시 예외가 생긴다는 것을 생각하고 개발합니다.
- 자주 변경되는 비즈니스적인 데이터를 자바 직렬화을 사용하지 않습니다.
- 긴 만료 시간을 가지는 데이터는 JSON 등 다른 포맷을 사용하여 저장합니다.


## Reference
- <http://woowabros.github.io/experience/2017/10/17/java-serialize.html>
- <http://woowabros.github.io/experience/2017/10/17/java-serialize2.html>
