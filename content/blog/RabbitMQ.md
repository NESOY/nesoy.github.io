---
aliases: [/articles/2019-02/RabbitMQ]
comments: false
date: 2019-02-14
description: 
tags: [MessageQueue, RabbitMQ]
title: RabbitMQ에 대해
---
# RabbitMQ에 대해
## [RabbitMQ란?](http://www.rabbitmq.com/)
- AMQP (Advanced Message Queueing Protocol) 메세지 브로커 소프트웨어(message broker software) 오픈소스입니다.
- AMQP -> 표준MQ 프로토콜

### 특징
- erlang, java
- Cluster, Federation
- HA(High Availability)
- Publish/Subscribe
- 다양한 plugin 지원

### RabbitMQ Work Flow
![[assets/posts/20190214/1.png]]

- 메세지는 Message Queue를 통해 원하는 사용자에게 전달할 수 있습니다.

![[assets/posts/20190214/2.png]]

- Message Broker는 Producer와 Consumer 사이 중간자 역할을 담당합니다.
- 가장 기초의 아키텍처이며 Message는 Queue에 저장되어 소비자가 조회할때까지 저장하게 됩니다.

### RabbitMQ는 언제 사용해야 할까요?

![[assets/posts/20190214/3.png]]

- Message Queue는 빠른 응답을 원할 때 주로 사용됩니다.
    - 위의 그림처럼 많은 Resource가 필요한 작업은 Event를 발생시켜 다른 API에게 위임합니다.
    - 다른 API에게 위임함으로써 Request에 대해 빠르게 응답을 할 수 있습니다.
- Message를 많은 사람들에게 전달하고 싶을때 주로 사용됩니다.
- 두 Application간의 결합도는 Message Queue를 통해 낮출 수 있는 장점이 있습니다.


### Exchanges
#### Message는 바로 Queue로 갈까요?
- Message는 바로 Queue로 Publishing 하지 않습니다.
- Producer는 Exchange에게 Message를 보냅니다.

#### Exchange란?
- 다른 Queue에게 Routing하는 역할을 담당합니다.

#### Types of Exchange
![[assets/posts/20190214/5.png]]

- Direct Exchange
    - Message의 Routing Key와 정확히 일치하는 Binding된 Queue로 Routing
- Fanout Exchange
    - Binding된 모든 Queue에 Message를 Routing
- Topic Exchange
    - 특정 Routing Pattern이 일치하는 Queue로 Routing
- Headers Exchange
    -  key-value로 정의된 Header 속성을 통한 Routing

#### Exchange 기타 설정값
- Durability
    - 브로커가 재시작 될 때 남아 있는지 여부
    - durable -> 재시작해도 유지가능
    - transient -> 재시작하면 사라집니다.
- Auto-delete
    - 마지막 Queue 연결이 해제되면 삭제

### Message Flow
![[assets/posts/20190214/4.png]]

- Producer는 Message를 Exchange에게 보내게 됩니다.
    - Exchange를 생성할때 Exchange의 Type을 정해야 합니다.
- Exchange는 Routing Key를 사용하여 적절한 Queue로 Routing을 진행합니다.
    - Routing은 Exchange Type에 따라 전략이 바뀌게 됩니다.
- Exchange - Queue와 Binding이 완료된 모습을 볼 수 있습니다.
    - Message 속성에 따라 적절한 Queue로 Routing이 됩니다.
- Message는 Consumer가 소비할때까지 Queue에 대기하게 됩니다.
- Consumer는 Message를 소비하게 됩니다.

### RabbitMQ 용어
- Vhost(virutal host)
    - Virtual Host를 통해서 하나의 RabbitMQ 인스턴스 안에 사용하고 있는 Application을 분리할 수 있습니다.
- Connection
    - 물리적인 TCP Connection, HTTPS -> TLS(SSL) Connection을 사용
- Channel
    - 하나의 물리적인 Connection 내에 생성되는 가상의 Connection
    - Consumer의 process나 thread는 각자 Channel을 통해 Queue에 연결 될 수 있습니다.


## Reference
- <https://blog.jonnung.com/rabbitmq/2019/02/06/about-amqp-implementtation-of-rabbitmq/>
- <http://blog.saltfactory.net/install-rabbitmq/>
