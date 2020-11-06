## JVM은 Stack Based VM이다.
- 가상 머신이라면 구현해야할 컨셉
    - 소스 코드를 VM이 실행가능한 바이트 코드로 변환
    - 명령어와 피연산자를 포함하는 데이터 구조

- 가상 머신을 구현하는 방법
    - Stack Based
    - Register Based

#### Stack Based VM
- JAVA VM, .NET CLR
    - 대다수의 VM이 스택 기반
- 피연산자와 연산 후 결과를 스택에 저장한다.
    - 덧셈을 하는 경우 스택 구조라서 PUSH & POP이 필요하여 4단계 명령이 필요하다.
        - POP 20
        - POP 7
        - ADD 20, 7 RESULT
        - PUSH RESULT
- 장점
    - 다음 피연산자의 메모리 위치를 기억할 필요가 없다.
    - SP가 다음 피연산자의 위치를 나타낸다.
    - 즉 스택에서 POP만 하면 다음 피연산자가 나오기 때문에 피연산자의 메모리를 기억할 필요가 없다.

#### Register Based VM
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

## Reference
- https://blog.naver.com/PostView.nhn?blogId=kbh3983&logNo=221292870568
- https://www.usenix.org/legacy/events/vee05/full_papers/p153-yunhe.pdf
- https://markfaction.wordpress.com/2012/07/15/stack-based-vs-register-based-virtual-machine-architecture-and-the-dalvik-vm/
- <http://blog.comprehend.in/2018/02/26/stack-VM-and-register-VM.html>
- <https://stackoverflow.com/questions/2719469/why-is-the-jvm-stack-based-and-the-dalvik-vm-register-based>