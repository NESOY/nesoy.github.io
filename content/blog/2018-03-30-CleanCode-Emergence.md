---
title: Clean Code - 창발성(Emergence)
tags:
  - CleanCode
date: 2018-03-30
aliases: 
  - ../articles/2018-03/CleanCode-Emergence
---
![[Assets/posts/20171211/cleancode.jpg]]


# 창발성(Emergence)
- 창발성이란 단순한 결합이 복잡한 결과를 나타내는 것을 의미.
- 인간의 뇌를 예로 들면 하나의 뉴런은 인식능력이 없지만 수십억개의 뉴런이 결합하게 되면 자기 인식이 발생하는 현상을 말하는 것.
- 이 창발성은 명령을 내리는 조정자 없이 각 부분의 의사소통으로 자기 조직화를 이루게 되고 이러한 밑으로 부터의 힘은 예기치 못한 기능을 발현하는 힘
- 쉽게 생각하면 집단 지성과 같은 것이 이에 해당한다고 볼 수 있는 것.
> 즉 창발적 설계란 어떤 규칙과 원칙에 따라 설계를 하게 되면, 그것들이 모여 아주 좋은 거시적 설계가 된다고 보면 될 듯.

## 창발적 설계로 깔끔한 코드를 구현하자.
>  켄트 벡이 제시한 단순한 설계 규칙 네 가지
- 모든 테스트를 실행한다.
- 중복을 없앤다.
- 프로그래머 의도를 표현한다.
- 클래스와 메서드 수를 최소로 줄인다.

## 모든 테스트를 실행하라.
테스트를 철저히 거쳐 모든 테스트 케이스를 항상 통과하는 시스템은 `테스트가 가능한 시스템`이다. 당연하지만 중요한 말이다. 테스트가 불가능한 시스템은 검증도 불가능하다. 논란의 여지는 있지만, 검증이 불가능한 시스템은 절대 출시하면 안 된다.


테스트 케이스가 많을수록 개발자는 테스트를 작성하기 더 쉬워진다. 결합도가 높으면 테스트 케이스를 작성하기 어렵다. `테스트 케이스를 만들고 계속 돌려라`라는 간단하고 단순한 규칙을 따르면 시스템은 낮은 결합도와 높은 응집력이라는, 객체 지향 방법론이 지향하는 목표를 저절로 달성한다. 즉, 테스트 케이스를 작성하면 설계 품질이 높아진다.

## 리팩토링
테스트 케이스를 모두 작성했다면 점진적으로 리팩토링 해나간다. `코드를 정리하면서 시스템이 깨질까 걱정할 필요가 없다. 테스트 케이스가 있으니까!`
테스트 케이스가 존재하므로 코드의 변화에 대해 두려움이 없어진다.

리팩토링 단계에서는 응집도를 높이고, 결합도를 낮추고, 관심사를 분리하고, 시스템 관심사를 모듈로 나누고, 함수와 클래스 크기를 줄이고, 더 나은 이름을 선택하는 다양한 기법들이 동원된다.

## 중복을 없애라
우수한 설계에서 중복은 커다란 적이다. 중복은 추가 작업, 추가 위험, 불필요한 복잡도를 뜻하기 때문이다. 중복은 여러 가지 형태로 표출된다. 똑같은 코드는 당연히 중복이다. 비슷한 코드는 더 비슷하게 고쳐주면 리팩터링이 쉬워진다.

```java
public void scaleToOneDimension(float desiredDimension, float imageDimension) {
  if (Math.abs(desiredDimension - imageDimension) < errorThreshold)
    return;
  float scalingFactor = desiredDimension / imageDimension;
  scalingFactor = (float)(Math.floor(scalingFactor * 100) * 0.01f);

  RenderedOpnewImage = ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor);
  image.dispose();
  System.gc();
  image = newImage;
}

public synchronized void rotate(int degrees) {
  RenderedOpnewImage = ImageUtilities.getRotatedImage(image, degrees);
  image.dispose();
  System.gc();
  image = newImage;
}
```

scaleToOneDimension 메서드와 rotate 메서드를 살펴보면 일부 코드가 동일하다. 다음과 같이 코드를 정리해 중복을 제거한다.

```java
public void scaleToOneDimension(float desiredDimension, float imageDimension) {
  if (Math.abs(desiredDimension - imageDimension) < errorThreshold)
    return;
  float scalingFactor = desiredDimension / imageDimension;
  scalingFactor = (float) Math.floor(scalingFactor * 10) * 0.01f);
  replaceImage(ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor));
}

public synchronized void rotate(int degrees) {
  replaceImage(ImageUtilities.getRotatedImage(image, degrees));
}

private void replaceImage(RenderedOpnewImage) {
  image.dispose();
  System.gc();
  image = newImage;
}
```

이런 '소규모 재사용'은 시스템 복잡도를 극적으로 줄여준다. 소규모 재사용을 제대로 익혀야 대규모 재사용이 가능하다.
`TEMPLATE METHOD` 패턴은 고차원 중복을 제거할 목적으로 자주 사용하는 기법이다. 예를 살펴보자.
```java
public class VacationPolicy {
  public void accrueUSDDivisionVacation() {
    // 지금까지 근무한 시간을 바탕으로 휴가 일수를 계산하는 코드
    // ...
    // 휴가 일수가 미국 최소 법정 일수를 만족하는지 확인하는 코드
    // ...
    // 휴가 일수를 급여 대장에 적용하는 코드
    // ...
  }

  public void accrueEUDivisionVacation() {
    // 지금까지 근무한 시간을 바탕으로 휴가 일수를 계산하는 코드
    // ...
    // 휴가 일수가 유럽연합 최소 법정 일수를 만족하는지 확인하는 코드
    // ...
    // 휴가 일수를 급여 대장에 적용하는 코드
    // ...
  }
}
```

최소 법정 일수를 계산하는 코드만 제외하면 두 메서드는 거의 동일하다. 최소 법정 일수를 계산하는 알고리즘은 직원 유형에 따라 살짝 변한다. 여기에 TEMPLATE METHOD 패턴을 적용해 눈에 들어오는 중복을 제거한다.

```java
abstract public class VacationPolicy {
  public void accrueVacation() {
    caculateBseVacationHours();
    alterForLegalMinimums();
    applyToPayroll();
  }

  private void calculateBaseVacationHours() { /* ... */ };
  abstract protected void alterForLegalMinimums();
  private void applyToPayroll() { /* ... */ };
}

public class USVacationPolicy extends VacationPolicy {
  @Override protected void alterForLegalMinimums() {
    // 미국 최소 법정 일수를 사용한다.
  }
}

public class EUVacationPolicy extends VacationPolicy {
  @Override protected void alterForLegalMinimums() {
    // 유럽연합 최소 법정 일수를 사용한다.
  }
}
```
## 표현하라
코드는 개발자의 의도를 분명히 표현해야 한다. 개발자가 코드를 명백하게 짤수록 다른 사람이 그 코드를 이해하기 쉬워진다. 그래야 결함이 줄어들고 유지보수 비용이 적게 든다.

1. 좋은 이름을 선택한다. 이름과 기능이 완전히 딴판인 클래스나 함수로 개발자를 놀라게 해서는 안 된다.
2. 함수와 클래스 크기를 가능한 한 줄인다. 작은 클래스와 작은 함수는 이름 짓기도 쉽고, 구현하기도 쉽고, 이해하기도 쉽다.
3. 표준 명칭을 사용한다. 예를 들어, 디자인 패턴은 의사소통과 표현력 강화가 주요 목적이다. 클래스가 COMMAND나 VISITOR와 같은 표준 패턴을 사용해 구현된다면 클래스 이름에 패턴 이름을 넣어준다. 그러면 다른 개발자가 클래스 설계 의도를 이해하기 쉬워진다.
4. 단위 테스트 케이스를 꼼꼼히 작성한다. 테스트 케이스는 소위 '예제로 보여주는 문서'다. 다시 말해, 잘 만든 테스트 케이스를 읽어보면 클래스 기능이 한눈에 들어온다.

하지만 표현력을 높이는 가장 중요한 방법은 노력이다. 나중에 코드를 읽을 사람은 바로 자신일 가능성이 높다는 사실을 명심하자.
함수와 클래스에 조금 더 시간을 투자하자. 더 나은 이름을 선택하고, 큰 함수를 작은 함수 여럿으로 나누고, 자신의 작품에 조금만 더 주의를 기울이자.

>주의는 대단한 재능이다.

## 클래스와 메서드 수를 최소로 줄여라
중복을 제거하고, 의도를 표현하고, `SRP`를 준수한다는 기본적인 개념도 극단으로 치달으면 득보다 실이 많아진다. 너무 많은 클래스와 메서드는 코드를 이해하는 데 있어서 더욱 어렵게 만드는 경우도 있다. 따라서 클래스와 메서드를 적절한 추상화 단계로 작성하는 것이 중요하다.


때로는 무의미하고 독단적인 정책 탓에 클래스 수와 메서드 수가 늘어나기도 한다. 클래스마다 무조건 인터페이스를 생성하라고 요구하는 구현 표준, 자료 클래스와 동작 클래스는 무조건 분리해야 한다고 주장하는 개발자도 좋은 예다. `가능한 독단적인 견해는 멀리하고 실용적인 방식을 택해야 한다.`


목표는 함수와 클래스 크기를 작게 유지하면서 동시에 시스템 크기도 작게 유지하는 데 있다. 하지만 이 규칙은 간단한 설계 규칙 네 개 중 우선순위가 가장
낮다. 다시 말해, 클래스와 함수 수를 줄이는 작업도 중요하지만, 테스트 케이스를 만들고 중복을 제거하고 의도를 표현하는 작업이 더 중요하다는 뜻이다.

## 결론
단순한 설계 규칙을 따른다면 (오랜 경험 후에야 익힐) 우수한 기법과 원칙을 단번에 활용할 수 있다.

## Reference
- <https://kwosu87.gitbooks.io/clean-code/content/Chapter%2012%20-%20%EC%B0%BD%EB%B0%9C%EC%84%B1.html>
