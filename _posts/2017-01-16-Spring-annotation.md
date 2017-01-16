---
layout: post
title: Spring Annotation(@Required,@Autowired,@Qulifier,@Resource)(Edit)
categories: [Spring]
excerpt: " "
comments: true
share: true
tags: [Spring,Annotation]
date: 2017-01-14
---

# **Spring Annotation**
- @Required, @Autowired, @Qulifier, @Resource

> Spring Annotation을 사용하기 위해서는 XML에서 활성화를 시켜줘야 한다.

- ## XML

```XML
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context-3.0.xsd">

   <context:annotation-config/> <!-- 이 문장이 활성화하는 문장 -->
   <!-- bean definitions go here -->

</beans>
```

- 만약 XML과 Annotation이 동시에 되어 있다면 XML이 Override를 합니다.


- ## @Required

  - 필수 Property를 표시하는 것으로 필수 Property가 없을 경우 BeanInitializationException Exception을 발생합니다.

- #### Student.java (@Required 2개)

```java
import org.springframework.beans.factory.annotation.Required;

public class Student {
   private Integer age;
   private String name;

   @Required
   public void setAge(Integer age) {
      this.age = age;
   }
   public Integer getAge() {
      return age;
   }

   @Required
   public void setName(String name) {
      this.name = name;
   }
   public String getName() {
      return name;
   }
}
```

- #### MainApp.java

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainApp {
   public static void main(String[] args) {
      ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml"); // Container 생성

      Student student = (Student) context.getBean("student");

      System.out.println("Name : " + student.getName() );
      System.out.println("Age : " + student.getAge() );
   }
}
```

- #### Beans.xml (Property 1개인 상황)

```xml
<!-- Definition for student bean -->
   <bean id="student" class="com.tutorialspoint.Student">
      <property name="name"  value="Zara" />
   </bean>
```

> @Required가 2개지만 Property를 1개만 적어줬기 때문에 Error가 난다.

- #### Error Message

> Property 'age' is required for bean 'student'


- #### Beans.xml (Property 2개인 상황)

```xml

   <!-- Definition for student bean -->
   <bean id="student" class="com.tutorialspoint.Student">
      <property name="name"  value="Zara" />
      <property name="age"  value="11"/>
   </bean>
```

- #### 결과물

Name : Zara , Age : 11

- ## @Autowired

  - @Required과 같이 사용하며 XML에 있는 <property> element를 제거하고 사용할 수 있습니다.

- #### TextEditor.java (@Autowired)

```java
import org.springframework.beans.factory.annotation.Autowired;

public class TextEditor {
   private SpellChecker spellChecker;

   @Autowired
   public void setSpellChecker( SpellChecker spellChecker ){
      this.spellChecker = spellChecker;
   }
   public SpellChecker getSpellChecker( ) {
      return spellChecker;
   }
   public void spellCheck() {
      spellChecker.checkSpelling();
   }
}
```

- #### SpellChecker.java

```java
public class SpellChecker {
   public SpellChecker(){
      System.out.println("Inside SpellChecker constructor." );
   }

   public void checkSpelling(){
      System.out.println("Inside checkSpelling." );
   }

}
```

- #### MainApp.java

```java
public class MainApp {
   public static void main(String[] args) {
      ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");

      TextEditor te = (TextEditor) context.getBean("textEditor");

      te.spellCheck();
   }
}
```

- #### Beans.xml

```xml
<!-- Definition for textEditor bean without constructor-arg  -->
<bean id="textEditor" class="com.tutorialspoint.TextEditor">
</bean>

<!-- Definition for spellChecker bean -->
<bean id="spellChecker" class="com.tutorialspoint.SpellChecker">
</bean>
```

- Setter Method를 만들지 않고 @Autowired를 통해 쉽게 Injection 할 수 있다.

```java
@Autowired
private SpellChecker spellChecker;
```

- constructor도 쉽게 @Autowired를 통해 <constructor-arg>를 추가하지 않고 할 수 있다.

```java
public class TextEditor {
   private SpellChecker spellChecker;

   @Autowired
   public TextEditor(SpellChecker spellChecker){
      System.out.println("Inside TextEditor constructor." );
      this.spellChecker = spellChecker;
   }

   public void spellCheck(){
      spellChecker.checkSpelling();
   }
}
```

- #### @Autowired Option
  - required: 반드시 설정할 필요가 없는 경우에 false값을 주어 프로퍼티가 존재하지 않더라도 스프링이 예외를 발생하지 않도록 한다. 기본값은 TRUE. ex) @Autowired(required=false)




## 참조
<https://www.tutorialspoint.com/spring/spring_annotation_based_configuration.htm>
<http://noritersand.tistory.com/156#@Autowired>
