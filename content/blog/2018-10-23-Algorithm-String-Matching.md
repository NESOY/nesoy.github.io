---
title: String Matching Algorithm에 대해
date: 2018-10-23
aliases: 
  - ../articles/2018-10/Algorithm-String-Matching
---

![[Assets/logo/algorithm.png]]

## 왜 우리는 String Matching Algorithm에 대해 고민할까?
- String Matching은 우리가 평소에 자주 사용하는 기능입니다.
    - 매우 간단하게 구현할 수 있습니다.
- 하지만 Text와 Pattern이 백과사전처럼 많은 양을 가지고 있다면?
    - Algorithm이 매우 느려지는게 되는 문제가 발생하게 됩니다.
    - 이를 해결하기 위해 개선된 String Matching Algorithm이 등장하게 되었습니다.
- DNA Pattern을 찾는 과정이 대표적인 예입니다.

### Naive String Matching Algorithm
- 단순히 문자 하나하나 비교하는 알고리즘

#### 문제점은 없을까요?
- 각각의 Pattern과 Text의 길이에 따라 시간복잡도가 선형적으로 늘어나는 문제
- Time Complexity : O(pattern_size * text_size)

### Rabin-Karp Algorithm
- 2차원 패턴 매칭과 관련된 문제의 알고리즘을 일반화할 수 있는 스트링 매칭 알고리즘
- 단순히 문자 하나하나 비교하기 전에?
    - 먼저 문자열을 Hash값 변환합니다.
    - 패턴 Hash값과 비교하여 시간 복잡도를 낮추는 알고리즘.
- 특수한 Case를 제외하면 평균 수행시간이 좋아집니다.

![[Assets/posts/20181023/3.png]]

#### 매번 문자열 전체를 가져와서 Hash값을 계산해야 하는가?
- [호너(Horner)의 법칙](https://en.wikipedia.org/wiki/Horner%27s_method)을 사용하여 단순하게 구할 수 있습니다.

![[Assets/posts/20181023/2.png]]


#### 문제점은 없을까요?
- Hash값이 일치하는 경우 항상 패턴이 일치하지 않는 경우가 있습니다.
- Time Complexity
    - 전처리 시간 : O(m)
    - 최악의 경우 : O((n-m+1)m)

### KMP(Knuth-Morris-Pratt) Algorithm
- 패턴을 미리 계산하고 결과값을 배열에 저장 및 보조 함수로 활용하여 빠르게 전이하는 Algorithm

![[Assets/posts/20181023/4.png]]

#### 문제점은 없을까요?
- Pattern에서 prefix와 suffix가 Matching이 되는 부분이 많지 않다면 효율적이지 않습니다.
- Time Complexity
    - 전처리 시간 : O(m)
    - 최악의 경우 : O((n-m+1)m)


### Source Code
- <https://github.com/NESOY/Algorithm/tree/master/src/INTRODUCTION_TO_ALGORITHMS/StringMatch>

## Reference
- <http://carstart.tistory.com/97>
- <http://www.student.montefiore.ulg.ac.be/~s091678/files/OHJ2906_Project.pdf>
- <https://brilliant.org/wiki/rabin-karp-algorithm/#the-rabin-karp-algorithm>
- <https://www.geeksforgeeks.org/finite-automata-algorithm-for-pattern-searching/>
- <http://bowbowbow.tistory.com/6>

