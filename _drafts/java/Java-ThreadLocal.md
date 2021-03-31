![No Image](/assets/logo/Java.jpg)

## How to work ThreadLocal?
### Create ThreadLocal
```java
public ThreadLocal() {
    // Lazy Loading
}
```

### First Set Operation
```java
public void set(T value) {
    Thread t = Thread.currentThread(); // 현재 Thread 정보 가져오기
    ThreadLocalMap map = getMap(t); // 현재 Thread가 가진 ThreadLocalMap을 반환
    if (map != null)
        map.set(this, value);
    else // 초기값은 null이기에 createMap을 호출
        createMap(t, value);
}
```

```java
ThreadLocalMap getMap(Thread t) {
    return t.threadLocals; // 초기값 null를 반환
}

class Thread{
    // Thread Field 선언
    // Default Value = null
    ThreadLocal.ThreadLocalMap threadLocals = null;
}
```

```java
void createMap(Thread t, T firstValue) {
    t.threadLocals = new ThreadLocalMap(this, firstValue); // 현재 실행하고 있는 Thread 변수에 ThreadLocal<T>정보와 firstValue를 넣으며 생성
}
```


### 그렇다면 ThreadLocalMap은 어떻게 구성되어있을까?
- ThreadLocal 내부 static class로 선언되어있다.
- ThreadLocalMap 내부에는 static inner class로 Entry가 선언되어있다.
```java
ThreadLocalMap(ThreadLocal<?> firstKey, Object firstValue) {
    table = new Entry[INITIAL_CAPACITY]; // Entry 배열
    int i = firstKey.threadLocalHashCode & (INITIAL_CAPACITY - 1); // 비트연산은 어떻게 진행되는지?
    table[i] = new Entry(firstKey, firstValue); // 해당 Index에 초기값 넣음.
    size = 1;
    setThreshold(INITIAL_CAPACITY);
}
```

## Reference
- <https://stackoverflow.com/questions/38994306/what-is-the-meaning-of-0x61c88647-constant-in-threadlocal-java>
- <https://www.javaspecialists.eu/archive/Issue164.html>