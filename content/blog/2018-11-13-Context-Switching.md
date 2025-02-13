---
title: Context Switching이란?
tags:
  - OS
date: 2018-11-13
aliases: 
  - ../articles/2018-11/Context-Switching
---
## 들어가며
> 면접에서 받았던 질문에 대해 정리하고 조금 더 자세하게 알기 위해 작성합니다.

## 왜 Context Switching이 필요한가?
### Computer가 매번 하나의 Task만 처리할 수 있다면?
- 해당 Task가 끝날때까지 다음 Task는 기다릴 수 밖에 없습니다.
- 또한 반응속도가 매우 느리고 사용하기 불편합니다.

### 그렇다면 다양한 사람들이 동시에 사용하는 것처럼 하기 위해선?
- Computer multitasking을 통해 빠른 반응속도로 응답할 수 있습니다.
- 빠른 속도로 Task를 바꿔 가며 실행하기 때문에 사람의 눈으론 실시간처럼 보이게 되는 장점이 있습니다.
- CPU가 Task를 바꿔 가며 실행하기 위해 Context Switching이 필요하게 되었습니다.

## Context Switching이란?
- 현재 진행하고 있는 Task(Process, Thread)의 상태를 저장하고 다음 진행할 Task의 상태 값을 읽어 적용하는 과정을 말합니다.

## 어떻게 Context Switching은 진행될까요?
- Task의 대부분 정보는 Register에 저장되고 PCB(Process Control Block)로 관리되고 있습니다.
- 현재 실행하고 있는 Task의 PCB 정보를 저장하게 됩니다. (Process Stack, Ready Queue)
- 다음 실행할 Task의 PCB 정보를 읽어 Register에 적재하고 CPU가 이전에 진행했던 과정을 연속적으로 수행을 할 수 있습니다.

### PCB(Process Control block) 구조
![[Assets/posts/20181113/1.png]]
- Process State : 프로세스 상태(Create, Ready, Running, waiting, terminated)
- Process Counter : 다음 실행할 명령어의 주소값
- CPU Registers: accumulator, index register, stack pointers, general purpose registers.


### Example
- i에 10을 넣고 Context Switching을 발생시키고 20넣고 Context Switching을 발생시키는 과정입니다.

![[Assets/posts/20181113/2.png]]

- `yield()`를 호출하여 CPU를 양보하여 Context Switching이 발생하게됩니다.

![[Assets/posts/20181113/3.png]]

- Context Switching을 위해 PC, SP값을 Stack에 저장하게 됩니다.

![[Assets/posts/20181113/4.png]]

- 현재 PC값과 SP값을 System Call `yield()`로 조정합니다.
![[Assets/posts/20181113/5.png]]

- context Switching을 진행하기 위해 PC값을 변경합니다.
![[Assets/posts/20181113/6.png]]

- 이전의 Task의 PC값과 SP값을 PCB에 담아 저장합니다.
![[Assets/posts/20181113/7.png]]

- Context 저장을 완료한 다음 Process X를 실행하게 됩니다.
![[Assets/posts/20181113/9.png]]

- Process X가 진행이 완료되고 다시 Context Switch가 발생하게 된다면 이전 Process로 돌아올 준비를 합니다.

![[Assets/posts/20181113/10.png]]

- Stack에 담긴 PC, SP를 읽어 다시 CPU에 적재합니다.
![[Assets/posts/20181113/11.png]]

- 다시 돌아온 Context지만 다시 `yield()`를 발생시켰기 때문에 위 과정을 다시 반복진행합니다.
![[Assets/posts/20181113/12.png]]


## Context Switching Cost
- Context Switching이 발생하게 되면 많은 Cost가 소요됩니다.
    - Cache 초기화
    - Memory Mapping 초기화
    - Kernel은 항상 실행되어야 합니다. (메모리의 접근을 위해서..)

### Process vs Thread
- Context Switching 비용은 Process가 Thread보다 많이 듭니다.
    - Thread는 Stack 영역을 제외한 모든 메모리를 공유하기 때문에
    - Context Switching 발생시 Stack 영역만 변경을 진행하면 됩니다.



## Reference
- <https://www.cs.swarthmore.edu/~kwebb/cs45/s18/03-Process_Context_Switching_and_Scheduling.pdf>
- <https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html>
- <https://wiki.osdev.org/Context_Switching>
