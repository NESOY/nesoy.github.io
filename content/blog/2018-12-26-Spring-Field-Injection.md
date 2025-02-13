---
title: Spring Field Injection에 대해
date: 2018-12-26
aliases: 
  - ../articles/2018-12/Spring-Field-Injection
---

![[Assets/logo/spring.png]]

## 왜(Why) Spring은 Field Injection보다 Constructor Injection을 권장할까?
![[Assets/posts/20181226/1.png]]

### Constructor Injection를 통해 얻는 장점은 무엇이 있을까?
- Component를 변경이 불가능한 `immutable 상태`로 선언이 가능합니다.
- 더 나아가 생성자의 Parameter를 통해 의존관계를 한눈에 파악하고 Refactoring의 필요성을 얻을 수 있습니다.
- Component간 순환 참조를 하고 있다면 `BeanCurrentlyInCreationException`이 발생해서 순환 의존성을 쉽게 알 수 있습니다.
- `특정 DI Container에 의존하지 않으며` 쉽게 단위 테스트도 가능하고 필요하다면 다른 DI Container로 전환이 가능합니다.
- DI Container가 Component를 주입을 못한 경우 실제 Method가 호출되기 이전인 생성자에서 Handling 할 수 있습니다.

### Example Code
```java
@Service
public class NesoyService {

	@Autowired
	private NesoyRepository repository;

	public void fieldInjection(){
		repository.sayHelloWorld();
		System.out.println(repository);
		repository = null;
		System.out.println(repository);
	}
}
```

#### Component에 null을 대입한다면..?
- 변경이 가능하기에 NullPointException이 발생할 가능성이 있습니다.

![[Assets/posts/20181226/2.png]]

#### Constructor Injection으로 개선한다면..?
- final 키워드를 통해 immutable한 상태로 유지할 수 있습니다.
- 따라서 주입된 component는 변경이 불가능합니다.

![[Assets/posts/20181226/3.png]]


#### @Autowired 제거하기
- 생성자가 하나인 경우 `@Autowired`를 제거해도 DI가 가능합니다.

![[Assets/posts/20181226/4.png]]


## Reference
- [DI(의존성 주입)가 필요한 이유와 Spring에서 Field Injection보다 Constructor Injection이 권장되는 이유](http://www.mimul.com/pebble/default/2018/03/30/1522386129211.html)
- <https://docs.spring.io/spring/docs/5.0.3.RELEASE/spring-framework-reference/core.html#beans-setter-injection>
- <https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-spring-beans-and-dependency-injection.html>
- [Field Dependency Injection Considered Harmful](https://www.vojtechruzicka.com/field-dependency-injection-considered-harmful/)
- <https://www.petrikainulainen.net/software-development/design/why-i-changed-my-mind-about-field-injection/>
