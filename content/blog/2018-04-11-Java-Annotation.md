---
title: Java Annotation이란?
tags:
  - Java
date: 2018-04-11
aliases: 
  - ../articles/2018-04/Java-Annotation
---

![[Assets/logo/Java.jpg]]

# Annotation
- Java 5부터 등장한 기능입니다.
- 흔히 알고 있는 `@Override`, `@Deprecated`이 대표적인 예입니다.
- AOP(Aspect Oriented Programing; 관심지향프로그래밍)을 편리하게 구성할 수 있습니다.

#### Annotation의 특징은 뭘까?
- 컴파일러에게 코드 문법 에러를 체크하도록 정보를 제공
- 소프트웨어 개발 툴이 빌드나 배치 시 코드를 자동으로 생성할 수 있도록 정보를 제공
- 어노테이션을 만들 때 용도를 분명하게 해야 한다.
	- 소스상에서만 유지해야 할지
	- 컴파일된 클래스에도 유지해야 할지
	- 런타임 시에도 유지해야 할지를 지정해야 한다.


## Built-in Annotation

#### @Override
- 메소드가 오버라이드 됐는지 검증합니다.
- 만약 부모 클래스 또는 구현해야할 인터페이스에서 해당 메소드를 찾을 수 없다면 컴파일 오류가 납니다.

#### @Deprecated
- 메소드를 사용하지 말도록 유도합니다. 만약 사용한다면 컴파일 경고를 일으킵니다.

#### @SuppressWarnings
- 컴파일 경고를 무시하도록 합니다.

#### @SafeVarargs
- 제너릭 같은 가변인자 매개변수를 사용할 때 경고를 무시합니다. (자바7 이상)

#### @FunctionalInterface
- 람다 함수등을 위한 인터페이스를 지정합니다. 메소드가 없거나 두개 이상 되면 컴파일 오류가 납니다. (자바 8이상)

## Meta Annotations
> Meta Annotation을 활용해 Custom Annotation을 만들 수 있습니다.

#### @Retention
- 어노테이션의 Life Time입니다.
- Class
	- 바이트 코드 파일까지 어노테이션 정보를 유지한다.
	- 하지만 리플렉션을 이용해서 어노테이션 정보를 얻을 수는 없다.
- Runtime
	- 바이트 코드 파일까지 어노테이션 정보를 유지하면서 리플렉션을 이용해서 런타임시에 어노테이션 정보를 얻을 수 있다.
- Source
	- Compile 이후로 삭제되는 형태
- <https://docs.oracle.com/javase/8/docs/api/java/lang/annotation/RetentionPolicy.html>

#### @Documented
- 문서에도 어노테이션의 정보가 표현됩니다.

#### @Target
- 적용할 위치를 결정합니다.

#### @Inherited
- 자식클래스가 어노테이션을 상속 받을 수 있습니다.

#### @Repeatable
- 반복적으로 어노테이션을 선언할 수 있게 합니다.

## Annotation 구조
```java
@Inherited // 상속
@Documented // 문서에 정보가 표현
@Retention(RetentionPolicy.RUNTIME) // 컴파일 이후에도 JVM에 의해서 참조가 가능합니다
@Retention(RetentionPolicy.CLASS)   // Compiler가 클래스를 참조할 때까지 유효합니다
@Retention(RetentionPolicy.SOURCE)  // 컴파일 이후 사라집니다
@Target({
		ElementType.PACKAGE, // 패키지 선언시
		ElementType.TYPE, // 타입 선언시
		ElementType.CONSTRUCTOR, // 생성자 선언시
		ElementType.FIELD, // 멤버 변수 선언시
		ElementType.METHOD, // 메소드 선언시
		ElementType.ANNOTATION_TYPE, // 어노테이션 타입 선언시
		ElementType.LOCAL_VARIABLE, // 지역 변수 선언시
		ElementType.PARAMETER, // 매개 변수 선언시
		ElementType.TYPE_PARAMETER, // 매개 변수 타입 선언시
		ElementType.TYPE_USE // 타입 사용시
})
public @interface NesoyAnnotation{
	/* enum 타입을 선언할 수 있습니다. */
	public enum Quality {
		BAD, GOOD, VERYGOOD
	}

	/* String은 기본 자료형은 아니지만 사용 가능합니다. */
	String value() default "NesoyAnnotation : Default String Value";

	/* 배열 형태로도 사용할 수 있습니다. */
	int[] values();

	/* enum 형태를 사용하는 방법입니다. */
	Quality quality() default Quality.GOOD;
}
```

## Custom Annotation 만들어보기

### Nesoy Annotation
- Annotation은 `RUNTIME`에 적용합니다.
- 적용할 범위는 `Method`만 입니다.

```java
@Inherited
@Documented
@Retention(RetentionPolicy.RUNTIME) // 컴파일 이후에도 JVM에 의해서 참조가 가능합니다
@Target({
		ElementType.METHOD, // 메소드 선언시
})
public @interface NesoyAnnotation{
	String value() default "NesoyAnnotation : Default String Value"; // 기본 값으로 확인할 수 있습니다.
}
```

### Nesoy Object
- 평소 Annotation을 사용했던 것처럼 사용하시면 됩니다.

```java
class NesoyObject{
	@NesoyAnnotation(value = "I'm Annotation") // 새로운 value를 넣을 수 있습니다.
	public void annotationTest(){
		System.out.println("Hello! Nesoy");
	}
}
```

### ContextContainer
- Java의 Reflection을 활용해서 Object의 Annotation invoke는 역할입니다.
- Java의 Reflection을 활용해서 Annotation의 value를 읽어들이는 역할입니다.

```java
class MyContextContainer {
	public MyContextContainer(){}
	/**
	 * 객체를 반환하기 전 어노테이션을 적용합니다.
	 * @param instance
	 * @param <T>
	 * @return
	 * @throws IllegalAccessException
	 */
	private <T> T invokeAnnonations(T instance) throws IllegalAccessException {
		Method[] methods = instance.getClass().getDeclaredMethods(); // Reflect으로 해당 클래스의 Method를 전부 조회합니다.

		for(Method method : methods){
			NesoyAnnotation annotation = method.getAnnotation(NesoyAnnotation.class); // Method들 중에 NesoyAnnotation을 찾습니다.
			if(annotation != null) { // NesoyAnnotation이 존재한다면
				System.out.println(annotation.value()); // annotation의 value를 출력합니다.
			}
		}

		return instance;
	}

	/**
	 * 매개변수로 받은 클래스의 객체를 반환합니다.
	 * @param clazz
	 * @param <T>
	 * @return
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	public <T> T get(Class clazz) throws IllegalAccessException, InstantiationException {
		T instance = (T) clazz.newInstance();
		instance = invokeAnnonations(instance);
		return instance;
	}
}
```

### Main

```java
public class Main {
	public static void main(String[] args) throws InstantiationException, IllegalAccessException {
		MyContextContainer demo = new MyContextContainer(); // Annotation을 호출할 Container를 선언합니다.
		NesoyObject object = demo.get(NesoyObject.class); // Container에서 클래스를 가져오면서 Annotation을 invoke합니다.
		object.annotationTest(); // Method를 호출합니다.
	}
}
```

### 결과물
- 기존의 Method에는 `"Hello! Nesoy"`만 있었지만 Annotation으로 인해 `I'm Annotation`이 먼저 출력되었습니다.
![[Assets/posts/20180411/1.png]]

## Reference
- <http://www.nextree.co.kr/p5864/>
- <http://jdm.kr/blog/216>
