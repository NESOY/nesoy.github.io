---
layout: post
title: Spring Annotation(@Required,@Autowired,@Qulifier,@Resource)
categories: [Spring]
excerpt: " "
comments: true
share: true
tags: [Spring,Annotation]
date: 2017-01-16
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

- ## @Autowired (Auto Wiring by type)

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
  - required: Property를 반드시 설정할 필요가 없는 경우에 false값을 주어 프로퍼티가 존재하지 않더라도 스프링이 예외를 발생하지 않도록 한다.
  - Default Value = TRUE. ex) @Autowired(required=false)


- ## @Qulifier
  - @Autowired와 자주 사용되는 Annotation으로써 동일 타입의 Bean객체가 존재시 특정 Bean을 삽입할 수 있게 설정할 수 있다.

- #### Student.java

```java
public class Student {
   private Integer age;
   private String name;

   public void setAge(Integer age) {
      this.age = age;
   }
   public Integer getAge() {
      return age;
   }
   public void setName(String name) {
      this.name = name;
   }
   public String getName() {
      return name;
   }
}
```

- #### Profile.java

```java
public class Profile {
   @Autowired
   @Qualifier("student1")
   private Student student;

   public Profile(){
      System.out.println("Inside Profile constructor." );
   }

   public void printAge() {
      System.out.println("Age : " + student.getAge() );
   }

   public void printName() {
      System.out.println("Name : " + student.getName() );
   }
}
```

- #### MainApp.java

```java
ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");

Profile profile = (Profile) context.getBean("profile");

profile.printAge();
profile.printName();
```

- #### 결과물
Inside Profile constructor.
Age : 11
Name : Zara

- #### Beans.XML

```xml
<!-- Definition for profile bean -->
   <bean id="profile" class="com.tutorialspoint.Profile">
   </bean>

   <!-- Definition for student1 bean -->
   <bean id="student1" class="com.tutorialspoint.Student">
      <property name="name"  value="Zara" />
      <property name="age"  value="11"/>
   </bean>

   <!-- Definition for student2 bean -->
   <bean id="student2" class="com.tutorialspoint.Student">
      <property name="name"  value="Nuha" />
      <property name="age"  value="2"/>
   </bean>
```

- ## @Resource (Auto Wiring by Name)
  - Name에 의해서 Auto Wiring 된다.

- #### @Resource Option
  - name : 자동으로 연결될 Bean 객체 이름을 입력한다.
  - ex) @Resource(name="test")

- #### PetOwner.java

```java
public class PetOwner {
    @Resource(name = "dog")
    private  AnimalType animal;

    public void play(){
        animal.sound();
    }
}
```

- #### Beans.xml

```xml
<bean id="dog" class="NesoyAnnotationTest"></bean>
```

## 참조

<https://www.tutorialspoint.com/spring/spring_annotation_based_configuration.htm>

<http://noritersand.tistory.com/156#@Autowired>
