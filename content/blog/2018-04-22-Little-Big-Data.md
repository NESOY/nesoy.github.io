---
title: Little Big Data 후기.
tags:
  - Review
date: 2018-04-22
aliases: 
  - ../articles/2018-04/Little-Big-Data
---
![[Assets/posts/20180422/1.png]]
## 정리.

## [LETS(Local Exchange and Trading System)](<http://www.seoulnpocenter.kr/bbs/board.php?bo_table=npo_aca&wr_id=22>)
- 서로를 연결하는 배움과 지식의 품앗이 시스템
- 포스트 잇을 통한 새로운 아이디어 공유 방법.
    - 내가 오늘 알아가고 싶은 것
    - 내가 오늘 알려줄 수 있는 것
    - 내가 오늘 배움을 나눈 것

## 내용.
- 한국어 자연어 처리의 어려움
- 한국어 자연어 처리는 PreProcessing가 80% 이상
- 문제 정의를 잘 하는 것이 모델을 구현하는 것보다 중요.
- Preprocessing의 중요성.
    - [Garbage in, Garbage Out](https://en.wikipedia.org/wiki/Garbage_in,_garbage_out)
    - 형태소 분석기가 어떤 Vocabulary를 사용하는지?

- 꼭 Deep Learning으로 풀어야하는 문제인가?
    - 더 간단한 방법으로 해결할 수 있으면 그 방법으로 해결하자.
- [EDA 탐색적 데이터 분석(Exploratory Data Analysis)](https://en.wikipedia.org/wiki/Exploratory_data_analysis)
- Domain Analysis
- Feature Engineering
    - 딥러닝은 모델보다 Feature가 더 중요.
    - 문제 해결에 필요한 Feature를 Selection하는 것이 중요.
    - Feature의 개수를 고민하기. 차원수가 높아지면 제대로 클러스터링이 안된다.
    - Feature의 개수를 줄이면 Overfitting 방지한다.
    - 모든 데이터 다 때려넣으면 안될까요?
        - 할 수는 있는데 Overfitting 문제 -> 정확도는 높으나 예측은 낮다.
        - 차원이 너무 많아져서 데이터의 밀도가 떨어짐
    - 어떤 Feature 상관관계가 높은지는 사후 분석해봐야 안다.
    - 사람이 직접 특이한 패턴을 찾는다.
    - 처음부터 무슨 Feature 상관관계가 높은지 모른다.
    - 용량은 더욱 커질 수 밖에 없음 -> Giga-> Tera -> Peta
        - Json보다는 특정한 Feature를 선별하여 CSV, TSV로 변환.
        - 목적에 맞도록 데이터 구성 : Cohort Retention를 위한 DataSet
        - 데이터에 중복이 없도록 최대한 설정
        - 최대한 데이터크기를 줄이기.
        - Flatten Table Data
        - Table Size 압축
    - 콜드데이터는 비용절감에 주력
    - 트레이닝 데이터 사이즈를 줄여보는 것도 방법 (1개월 -> 10일 -> 24시간 )
    - 머신러닝에 들어가는 피쳐는 최대한 줄이고 차원을 축소해서 트레이닝 비용을 줄이기.
- 어떻게 모델을 만들어야 할까?
    - 어떤게 더 중요한지 모르니 모든걸 다 로그로 쌓고
    - EDA를 진하게 진행해서 특이한 패턴을 찾고
    - 특이한 패턴을 통해 모델을 학습시키고
    - 데이터는 테스트 기반 Validation.
    - 계속해서 시도하고 실패하다 보면
    - 원하시는 모델이 나올겁니다.
- SVM은 왜 적용을 안했는가?
    - 처음 적용했지만 점점 정확도가 감소한다.
    - Feature를 선별해서 DeepLearning을 적용했다.
- 모델이 변경된다면 어떻게 할까요?
    - 규약을 미리 정하기 Code Level
    - Validation을 해서 Warning이 나온다면 커뮤니케이션하기.
- Preprocessing -> normalize -> 0~1사이로 바꾸기. log


## 나는 무엇을 얻었는가?
### 자연어 처리
- 인턴 과제로 받았던 한국어 댓글 분석에서 내가 겪였던 문제들을 이렇게도 풀 수 있구나라는 걸 알게 되었습니다.
- 한국어 자연어 처리가 매우 중요하다는 점.
- 내가 사용하고 있는 자연어 처리 라이브러리가 어떻게 자연어 데이터를 사용하고 있는지?
- 내가 어떠한 형태의 한국어를 분석하고 있는지?

### 문제에 대한 정의 중요성.
- 요구사항에 대한 정의가 명확하지 않으면 원하는 결과가 나오지 않을 가능성이 높다.
- 회사가 커지면 커질수록 문제에 대한 이해와 요구사항을 정의하는게 중요하다.
- 문제를 어떻게 정의할 것인가?
    - 뭘 원하는지? 어떤 것을 해결하고 싶은지?
    - 이런 Case에는 어떻게 할 것인지?
- 요구하는 사람이 원하는 것을 충족하는 게 가장 중요하다.

### 데이터 정제의 중요성.
- 엄청나게 많은 Feature를 상대로 의미있는 데이터를 뽑아내기 위해선?
    - Peta 크기보다 더 많은 Data와 엄청난 Computing이 필요하다.
    - 구글 정도의 데이터 크기와 Computing이면 가능할지도?
- 우리는 대부분 그런 데이터가 없다.
    - 그렇기 때문에 데이터에서 Feature를 선별할 수 있어야하며.
    - 다양한 Feature를 실험하고 정의하는게 중요한 것 같다.

### 앞으로 미래?
- SQL을 예전에는 개발자만 사용했더라면 현재는 개발자뿐만 아니라 많은 사람들이 사용하는 것처럼
    - 앞으로 이런 Data를 쉽게 사용하는 Tool이 나올 것 같다.
    - Data를 어떻게 해석할 것인가? 어떻게 정제할 것인가? 중요해질 것 같다.
- 생각보다 엄청난 Data의 크기.
- 관련 논문 많이 읽어보기.

> 세상은 대단한 사람들이 너무 많고 언제나 나의 부족함을 느낀다. 개발자가 과연 개발만 하는 사람인가? 지금은 문제해결을 하기 위해 소프트웨어를 사용하는 사람으로 볼 수 있을 것 같다.

## Reference
- <https://zzsza.github.io/etc/2018/04/21/little-big-data/>
