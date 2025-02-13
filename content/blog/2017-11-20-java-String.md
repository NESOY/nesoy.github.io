---
title: String, StringBuilder, StringBuffer 차이.
tags:
  - Java
date: 2017-11-20
aliases: 
  - ../articles/2017-11/java-String
---

![[Assets/logo/Java.jpg]]

> 특정한 문자열을 계속적으로 더하여 결과 값을 가져오는 문제를 풀고 있었다. 시간 초과가 발생하여 문제를 찾아보니 사용했던 문자열 Class에 대한 문제였다. 각 문자열 Class에 차이를 이해하고 문제를 해결하여 포스팅을 한다.

## String, StringBuilder, String Buffer의 차이.
- `String` : 기존의 문자열에 문자를 추가한다면 새로운 객체를 만들어 지정하고 기존의 문자열 객체는 쓰레기가 된다.
- `StringBuilder` : 기존의 문자열 객체의 크기를 증가시켜 값을 더한다. // 동기화 기능 제공 X
- `StringBuffer` : 기존의 문자열 객체의 크기를 증가시켜 값을 더한다. // 동기화 기능 제공 O

### Test code
```java
/**
 * Created by nesoy on 2017. 11. 16..
 * blog : https:nesoy.github.io
 * email : kyoje11@gmail.com
 */
public class Main {
    public static void main(String[] args) {
        test_string(100);
        test_stringBuilder(100);
        test_stringBuffer(100);

        test_string(1000);
        test_stringBuilder(1000);
        test_stringBuffer(1000);

        test_string(10000);
        test_stringBuilder(10000);
        test_stringBuffer(10000);

        test_string(100000);
        test_stringBuilder(100000);
        test_stringBuffer(100000);

    }

    public static void test_string(int size) {
        long start = System.currentTimeMillis();

        String test = "";
        for (int i = 0; i < size; i++) {
            test += i;
        }

        long end = System.currentTimeMillis();
        System.out.println("String");
        System.out.println("크기 : " + size + " 시간 : " + (end - start));

    }

    public static void test_stringBuilder(int size) {
        long start = System.currentTimeMillis();

        StringBuilder testBuilder = new StringBuilder();
        for (int i = 0; i < size; i++) {
            testBuilder.append(i);
        }

        long end = System.currentTimeMillis();
        System.out.println("StringBuilder");
        System.out.println("크기 : " + size + " 시간 : " + (end - start));
    }

    public static void test_stringBuffer(int size) {
        long start = System.currentTimeMillis();

        StringBuffer testBuilder = new StringBuffer();
        for (int i = 0; i < size; i++) {
            testBuilder.append(i);
        }

        long end = System.currentTimeMillis();
        System.out.println("StringBuffer");
        System.out.println("크기 : " + size + " 시간 : " + (end - start));
        System.out.println();
    }
}
```

### Result
![[Assets/posts/20171120/result.png]]
- `String`이 많은 연산을 하게되면 확연하게 느린 것을 확인할 수 있다.


## Thinking - Update 2018.09.14
### 그렇다면 왜 String이 immutable하게 설계했을까?
- immutable하게 설계함으로써 Side effect를 최대한 제거하려는 의도인거 같습니다.
- 실제로 Side effect는 줄었지만 Memory를 더 많이 사용하게 되는 issue가 발생하게 되었습니다.
- 그렇기에 mutable한 `StringBuilder`가 나오게 되었지만 Thread-Safe하지 않은 문제가 발생하게 되었습니다.
- mutable하면서 Thread-Safe한 `StringBuffer`가 등장하게 되었습니다.
