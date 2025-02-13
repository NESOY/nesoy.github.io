---
title: Clean Code - 시스템(System)
tags:
  - CleanCode
date: 2018-03-20
aliases: 
  - ../articles/2018-03/CleanCode-System
---
![[Assets/posts/20171211/cleancode.jpg]]

# 시스템(System)
> 복잡성은 죽음이다. 개발자에게서 생기를 앗아가며, 제품을 계획하고 제작하고 테스트하기 어렵게 만든다.

## 시스템 제작과 시스템 사용을 분리하라.
- 소프트웨어 시스템은 `준비 과정`과 `런타임 로직`을 분리해야 한다.
- 시작 단계는 모든 어플리케이션이 풀어야 할 `관심사`이다.
- `관심사 분리`는 우리 분야에서 가장 오래되고 가장 중요한 설계 기법 중 하나다.

```java
public Service getService() {
    if (service == null)
        service = new MyServiceImpl(...); // 모든 상황에 적합한 기본값일까?
    return service;
}
```

초기화 지연(Lazy Initialization) 혹은 계산 지연(Lazy Evalution)이라는 기법이다.
실제로 필요할 때까지 객체를 생성하지 않기 때문에 불필요한 부하가 없어진다. 따라서 어플리케이션을 시작하는데 아주 빠르다.
어떤 경우에도 `null`을 반환하지 않는다.


하지만 서비스는 `MyServiceImpl` 클래스에 의존하게 된다. `MyServiceImpl`을 사용하지 않더라도 의존성을 해결하지 않으면 컴파일이 안되는 문제가 발생한다. 테스트 수행에도 문제가 발생한다.


만약 `MyServiceImpl` 객체가 무거운 객체라면 테스트를 위한 Mock Object를 service필드에 대입해야 하며, 이는 기존의 runtime 로직에 관여하기 때문에 `모든 가능한 경우의 수`를 고려해야 하는 문제도 발생한다.


이러한 생성/사용의 분산은 모듈성을 저해하고 코드의 중복을 가져오므로 잘 정돈된 견고한 시스템을 만들기 위해서는 **전역적이고 일관된 의존성 해결 방법**을 통해 위와 같은 작은 편의 코드들이 모듈성의 저해를 가져오는 것을 막아야 한다.

### Main 분리

아래의 그림처럼 생성과 관련된 코드는 모두 main이나 main이 호출하는 모듈로 옮기고 나머지 시스템은 모든 객체가 생성되었고 모든 의존성이 연결되었다고 가정하고 비즈니스 로직에 집중할 수 있다.
![[Assets/posts/20180320/1.png]]

#### 팩토리(Factory)

어떤 경우에는 생성에 관련된 부분을 애플리케이션이 결정할 필요가 있다. 그런 부분은 Factory Pattern을 사용하여 애플리케이션이 결정하지만 직접 생성하는 부분의 연관성을 제거한다.

![[Assets/posts/20180320/2.png]]

#### 의존성 주입(Dependency Injection)
제어 역전(Inversion of Control IOC)을 적용한 메커니즘이다. 인스턴스를 생성할 책임을 지는 `main`이나 특수 `컨테이너`를 사용한다.
의존성을 주입하기 위해서는 보통 `setter`메서드나 생성자를 제공해야 한다.


가장 널리 알려진 스프링 프레임워크는 자바 DI 컨테이너를 제공한다. 객체 사이 의존성은 XML을 통해 정의 된다.

## 확장
내일은 새로운 스토리에 맞춰 시스템을 조정하고 확장하면 된다. 이것이 반복적이고 점진적인 애자일 방식의 핵심이다.
깨끗한 코드는 코드 수준에서 시스템을 조정하고 확장하기 쉽게 만든다.

아래의 코드는 EJB2를 상속받아 구현한 Bussiness Logic이다.
 ```java
 /* Code 2-1(Listing 11-1): An EJB2 local interface for a Bank EJB */
 package com.example.banking;
import java.util.Collections;
import javax.ejb.*;
public interface BankLocal extends java.ejb.EJBLocalObject {
  String getStreetAddr1() throws EJBException;
  String getStreetAddr2() throws EJBException;
  String getCity() throws EJBException;
  String getState() throws EJBException;
  String getZipCode() throws EJBException;
  void setStreetAddr1(String street1) throws EJBException;
  void setStreetAddr2(String street2) throws EJBException;
  void setCity(String city) throws EJBException;
  void setState(String state) throws EJBException;
  void setZipCode(String zip) throws EJBException;
  Collection getAccounts() throws EJBException;
  void setAccounts(Collection accounts) throws EJBException;
  void addAccount(AccountDTO accountDTO) throws EJBException; }
```

```java
 /* Code 2-2(Listing 11-2): The corresponding EJB2 Entity Bean Implementation */
 package com.example.banking;
 import java.util.Collections;
 import javax.ejb.*;
 public abstract class Bank implements javax.ejb.EntityBean {
   // Business logic...
   public abstract String getStreetAddr1();
   public abstract String getStreetAddr2();
   public abstract String getCity();
   public abstract String getState();
   public abstract String getZipCode();
   public abstract void setStreetAddr1(String street1);
   public abstract void setStreetAddr2(String street2);
   public abstract void setCity(String city);
   public abstract void setState(String state);
   public abstract void setZipCode(String zip);
   ublic abstract Collection getAccounts();
   public abstract void setAccounts(Collection accounts);
   public void addAccount(AccountDTO accountDTO) {
    InitialContext context = new InitialContext();
    AccountHomeLocal accountHome = context.lookup("AccountHomeLocal");
    AccountLocal account = accountHome.create(accountDTO);
    Collection accounts = getAccounts(); accounts.add(account);
    }
    // EJB container logic public
    abstract void setId(Integer id);
    public abstract Integer getId();
    public Integer ejbCreate(Integer id) { ... }
    public void ejbPostCreate(Integer id) { ... }
    // The rest had to be implemented but were usually empty:
    public void setEntityContext(EntityContext ctx) {}
    public void unsetEntityContext() {}
    public void ejbActivate() {}
    public void ejbPassivate() {}
    public void ejbLoad() {}
    public void ejbStore() {}
    public void ejbRemove() {}
   }
 ```

위에 코드는 `EJB2`의 컨테이너에 강하게 결합된다. 필요없는 메소드를 상속받아야 하며 덩그러니 남아있다.
객체 지향 프로그래밍이라는 개념조차 뿌리가 흔들린다.

### 횡단(cross-cutting) 관심사
`EJB2`는 관심사를 거의 완벽하게 분리해 냈다. 예를 들어 트랜잭션, 보안, 일부 영속적인 동작까지 분리해냈다.
이런 관점 지향 프로그래밍(Aspect-Oriented Programming AOP)을 예견했다고 보인다.

## 자바 프록시
- 자바 프로시는 단순환 상황에 적합하다. 개별 객체나 클래스에서 메서드 호출을 감싸는 경우는 좋은 예다.
- 프로식 API에는 InvocationHandler를 넘겨 줘야 한다.
- 코드는 상당히 많으며 제법 복잡하다. -> 깨끗한 코드를 작성하기 어렵다.

## 순수 자바 AOP 프레임 워크
![[Assets/posts/20180320/3.png]]

위의 그림을 코드로 표현하면 아래와 같다.

```java
/* Code 3-3: Code 3-2의 활용법 */

XmlBeanFactory bf = new XmlBeanFactory(new ClassPathResource("app.xml", getClass()));
Bank bank = (Bank) bf.getBean("bank");
```


구조 정의를 위한 xml은 다소 장황하고 읽기 힘들 수는 있지만 Java Proxy보다는 훨씬 간결하다.
이 개념은 아래에 설명할 `EJB3`의 구조 개편에 큰 영향을 미쳤다. `EJB3`은 xml와 Java annotation을 사용해 cross-cutting concerns를 정의하고 서포트하게 되었다.


아래와 같이 `EJB2`를 사용하는 코드보다 훨씬 간결하고 결합도가 낮아진 것을 확인 할 수 있다.

```java
/* Code 3-4(Listing 11-5): An EBJ3 Bank EJB */

package com.example.banking.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "BANKS")
public class Bank implements java.io.Serializable {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @Embeddable // An object “inlined” in Bank’s DB row
    public class Address {
        protected String streetAddr1;
        protected String streetAddr2;
        protected String city;
        protected String state;
        protected String zipCode;
    }

    @Embedded
    private Address address;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="bank")
    private Collection<Account> accounts = new ArrayList<Account>();
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void addAccount(Account account) {
        account.setBank(this);
        accounts.add(account);
    }

    public Collection<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(Collection<Account> accounts) {
        this.accounts = accounts;
    }
}
```
- 영속성 정보는 필요하다면 XML배치 기술자로 옮겨도 괜찮다. 그러면 순수한 POJO만 남는다.

## AspectJ 관점
- AspectJ는 AOP를 실현하기 위한 full-featured tool이라 일컬어진다.
- 8~90%의 경우에는 Spring AOP와 JBoss AOP로도 충분하지만 AspectJ는 훨씬 강력한 수준의 AOP를 지원한다.
- 다만 이를 사용하기 위해 새로운 툴, 언어 구조, 관습적인 코드를 익혀야 한다는 단점도 존재한다.
- 최근 소개된 "annotation-form AspectJ"로 인해 적용에 필요한 노력은 많이 줄어들었다고 한다.
- AOP에 대한 더 자세한 내용은 [AspectJ], [Colyer], [Spring]를 참조하기 바란다.


## 테스트 주도 시스템 아키텍처 구축
- 코드 레벨에서부터 아키텍쳐와 분리된(decouple된) 프로그램 작성은 당신의 아키텍쳐를 test drive하기 쉽게 만들어 준다.
- 처음에는 작고 간단한 구조에서 시작하지만 필요에 따라 새로운 기술을 추가해 정교한 아키텍쳐로 진화할 수 있다.
- 또한 decouple된 코드는 user story, 규모 변화와 같은 변경사항에 더 빠르게 대처할 수 있도록 우리를 도와 준다.
- 도리어 BDUF(Big Design Up First)와 같은 방식은 변경이 생길 경우 기존의 구조를 버려야 한다는 심리적 저항, 아키텍쳐에 따른 디자인에 대한 고민 등 변화에 유연하지 못한 단점들을 가져오게 된다.

> 이상적인 시스템 아키텍쳐는 각각 POJO로 만들어진 모듈화된 관심 분야 영역(modularized domains of concern)으로 이루어져야 한다. 다른 영역끼리는 Aspect의 개념을 사용해 최소한의 간섭으로 통합되어야 한다. 이러한 아키텍쳐는 코드와 마찬가지로 test-driven될 수 있다.

## 의사 결정을 최적화하라
충분히 큰 시스템에서는(그것이 도시이건 소프트웨어이건) 한 사람이 모든 결정을 내릴 수는 없다. 결정은 최대한 많은 정보가 모일 때까지 미루고 시기가 되었을 경우 해당 파트의 책임자(여기서는 사람이 아닌 모듈화된 컴포넌트를 뜻한다)에게 맡기는 것이 불필요한 고객 피드백과 고통을 덜어줄 것이다.

> 모듈화된 관심 분야로 이루어진 POJO 시스템의 (변화에 대한)민첩함은 가장 최신의 정보를 가지고 적시에 최적의 선택을 할 수 있게 도와준다. 결정에 필요한 복잡도 또한 경감된다.

## 명백한 가치가 있을 때 표준을 현명하게 사용하라
많은 소프트웨어 팀들은 훨씬 가볍고 직관적인 디자인이 가능했음에도 불구하고 그저 표준이라는 이유만으로 EJB2 구조를 사용했다. **표준에 심취해 "고객을 위한 가치 창출"이라는 목표를 잃어 버렸기 때문이다.**
> 표준을 사용하면 아이디어와 컴포넌트를 재사용하기 쉽고, 적절한 경험을 가진 사람을 구하기 쉬우며 좋은 아이디어를 캡슐화하기 쉽고, 컴포넌트를 엮기 쉽다.

## 시스템은 도메인 특화 언어가 필요하다
좋은 DSL은 도메인 영역의 개념과 실제 구현될 코드 사이의 `소통의 간극`을 줄여 도메인 영역을 코드 구현으로 번역하는 데에 오역을 줄여준다. DSL을 효율적으로 사용하면 코드 덩어리와 디자인 패턴의 추상도를 높여 주며 그에 따라 코드의 의도를 적절한 추상화 레벨에서 표현할 수 있게 해준다.

> DSL은 "모든 단계에서의 추상화"와 "모든 도메인의 POJO화"를 고차원적 규칙과 저차원적 디테일 전반에 걸쳐 도와 준다.


## 결론
> 시스템은 깨끗해야 하며 모든 추상화 단계에서 의도는 명확히 표현해야 한다.

## Reference
- <https://kwosu87.gitbooks.io/clean-code/content/Chapter%2011%20-%20%EC%8B%9C%EC%8A%A4%ED%85%9C.html>

