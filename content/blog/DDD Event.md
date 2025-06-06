---
aliases: [/articles/2018-07/DDD-Event]
comments: false
date: 2018-07-11
description: 
tags: [DDD]
title: DDD - Event
---
# 이벤트
## 이벤트가 왜(Why) 필요할까요?
### Example
#### 쇼핑몰에서 구매를 취소하면?
![[assets/posts/20180711/1.png]]
- 환불 처리를 진행 해야 합니다.

#### 환불 처리 서비스가 Exception이 발생한다면?
![[assets/posts/20180711/2.png]]
- 진행했던 환불 처리를 취소(Rollback) 하는 방법도 있습니다.
- 환불 처리는 진행(Commit)하고 환불 처리를 재시도(Retry)를 하는 방법도 있습니다.

#### 환불 처리 서비스가 늦게 응답한다면?
![[assets/posts/20180711/3.png]]
- 환불을 처리하는 외부 시스템의 응답 시간이 길어지면 그만큼 CancelOrderService는 기다리게 됩니다.
- CancelOrderService의 성능은 RefundService에 의존적이게 됩니다.

#### 취소 서비스에 기능을 더 추가하게 된다면?
![[assets/posts/20180711/4.png]]

- 취소 서비스에 E-Mail을 통해 취소 알림을 받고 싶은 기능을 추가하게 됩니다.
- 그렇게 된다면 취소 서비스는 RefundService, NotiService에 의존적이게 됩니다.
- 취소 서비스는 취소, 알림, 환불 로직이 섞이게 되고. 문제는 더 복잡해 집니다.
  - 환불은 성공했지만, 알림이 실패했다면?

### Bounded Context 간의 강결합(High Coupling)
- 취소, 알림, 환불이 모두 강하게 결합되어 있기 때문에 예시와 같은 문제가 발생했습니다.


### 문제를 해결하려면?
![[assets/posts/20180711/5.png]]

> Bounded Context 간의 강한 결합도를 낮추기 위해 Event를 사용하여 비동기적으로 Processing 하는 방법이 등장하게 되었습니다.

## 이벤트는 어디(Where)에 쓰일까요?
- Trigger
  - 주문의 경우 주문 취소 이벤트가 트리거가 될 수 있다.
  - 환불 서비스는 주문 취소 이벤트를 사용할 수 있다.
- 서로 다른 시스템 간의 데이터 동기화
  - 배송지 변경 이벤트 발생
    - 외부 배송 배송지 변경
    - 내부 배송 배송지 변경

## 비동기 이벤트 처리
- 로컬 핸들러를 비동기로 실행
- 이벤트 저장소와 이벤트 포워더 사용
  - Polling
  - 외부에 이벤트를 전달하는 방식
  - 이벤트 추적 데이터 포워더에 저장
- 이벤트 저장소와 이벤트 제공 API 사용
  - Interrupt
  - 핸들러가 API 서버를 통해 이벤트 목록을 가져오는 방식
  - 이벤트 추적 외부 핸들러에 저장
- 메시지 큐 사용
  - RabbitMQ : Global Transaction 지원과 함께 클러스터와 HA 지원
  - Kafka : Global Transaction 지원 X, 다른 Message Queue보다 높은 성능

### Global Transaction
- 필요하다면 이벤트를 발생하는 도메인 기능과 메시지 큐에 이벤트를 저장하는 절차를 한 트랜잭션으로 묶어야 한다.
- 그렇기 위해선 Global Transcation이 필요합니다.

![[assets/posts/20180711/7.png]]

- <https://www.popit.kr/rest-%EA%B8%B0%EB%B0%98%EC%9D%98-%EA%B0%84%EB%8B%A8%ED%95%9C-%EB%B6%84%EC%82%B0-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EA%B5%AC%ED%98%84-1%ED%8E%B8/>
- <https://www.popit.kr/rest-%EA%B8%B0%EB%B0%98%EC%9D%98-%EA%B0%84%EB%8B%A8%ED%95%9C-%EB%B6%84%EC%82%B0-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EA%B5%AC%ED%98%84-2%ED%8E%B8-tcc-cancel-timeout/>

## 이벤트 적용 시 고려사항
- 이벤트 소스 자체를 이벤트에 추가할지 여부
- 이벤트 전송 실패를 얼마나 허용할 것인지
- 이벤트 손실
- 이벤트 순서
- 이벤트 재처리(멱등성)

# Etc
## Publisher - Subscribe Pattern
![[assets/posts/20180711/6.png]]
### Advantages
- 낮은 결합도(Loose coupling)
- 확장성(Scalability)

### Disadvantages
- 메시지 전달을 보장할 수 없다.
- Topic 병목 현상

## Slide
<iframe src="//www.slideshare.net/slideshow/embed_code/key/xSnFAa7RtOSi0P" width="510" height="420" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>



## Reference
- <https://github.com/iamkyu/TIL/blob/master/books/summary/ddd-start.md#10-%EC%9D%B4%EB%B2%A4%ED%8A%B8>
- <https://www.student.cs.uwaterloo.ca/~cs446/1171/Arch_Design_Activity/PublishSubscribe.pdf>
- <https://aws.amazon.com/ko/pub-sub-messaging/>
