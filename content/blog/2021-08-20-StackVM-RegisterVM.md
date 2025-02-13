---
title: StackVM, RegisterVM이란?
tags:
  - Java
date: 2021-08-20
aliases: 
  - ../articles/2021-08/StackVM-RegisterVM
---
## 들어가며
- CPU는 Operand를 저장하는 위치에 따라 Register-Based VM, Stack-based VM 두
가지로 나뉘게 된다.
- Operand의 예는 어셈블리어에서 명렁어를 실행할 때 저장되는 Operand라고 생각하면 된다.
```
MOV DS, AX // AX의 값은 DS로 이동된다.
```

#### Stack Based VM
- JAVA VM, .NET CLR
    - 대다수의 VM이 스택 기반으로 이루어져 있다.
- 동작방법은 다음과 같다.
    - Operand와 연산 후 결과를 스택에 저장한다.
    - 예를 들어 덧셈을 하는 경우?
        - 스택 구조로 Operand를 저장하기 때문에 PUSH & POP이 필요하다
        - 4단계 명령이 필요하다.
        ```
        POP 20
        POP 7
        ADD 20, 7 RESULT
        PUSH RESULT
        ```
- 특징
    - 다음 피연산자의 메모리 위치를 기억할 필요가 없다.
    - SP가 다음 피연산자의 위치를 나타낸다.
    - 즉 스택에서 POP만 하면 다음 피연산자가 나오기 때문에 피연산자의 메모리를 기억할 필요가 없다.

![[Assets/posts/img/2021-08-19-23-41-49.png]]

#### Register-Based VM
- Lua VM, Dalvik VM
    - 피연산자가 CPU의 레지스터에 저장된다.
    - PUSH & POP 연산자가 없다.
    - 명령어가 피연산자의 위치인 레지스터의 주소를 기억해야 한다.
- 장점
    - 아래와 같이 POP & PUSH 과정이 없기 때문에 같은 덧셈이라도 하나의 명령으로 충분하다.
    - 스택기반에서는 할 수 없는 명령어 최적화를 적용할 수 있다.
- 단점
    - 스택 기반보다 명령어의 길이가 길다.
    - 피연산자의 주소를 명시해줘야 하므로 평균적으로 길 수 밖에 없다.


#### Java의 Example
![[Assets/posts/img/2021-08-19-23-58-14.png]]
- addAndPrint()에 대한 Stack Frame이 있고 1, 88.88이 존재한다.
- addTwoTypes라는 메소드를 호출하면서 Stack Frame을 생성하고 local variable에 1, 88.88가 존재하게 된다.
- 연산이 끝난 후 기존에 있던 스택프레임의 Operand값이 변경된 것을 확인할 수 있다.

## Reference
- <https://blog.naver.com/PostView.nhn?blogId=kbh3983&logNo=221292870568>
- <https://www.usenix.org/legacy/events/vee05/full_papers/p153-yunhe.pdf>
- <https://markfaction.wordpress.com/2012/07/15/stack-based-vs-register-based-virtual-machine-architecture-and-the-dalvik-vm/>
- <http://blog.comprehend.in/2018/02/26/stack-VM-and-register-VM.html>
- <https://stackoverflow.com/questions/2719469/why-is-the-jvm-stack-based-and-the-dalvik-vm-register-based>
