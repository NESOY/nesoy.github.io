## Garbage Collector
- 분석용 데이터의 원천으로서도 가치가 높기 떄문에 JVM 프로세스는 예외 없이, 특히 운영 환경에서는 GC 로그를 꼭 남겨야 한다.


## Mark And Sweep

## OOP(Ordinary Object Pointer)
- instanceOop
    - Mark word(인스턴스 관련 메타데이터를 가리키는 포인터)
    - Klass Word(클래스 메타 데이터를 가리키는 포인터)

- `-XX:+UseCompressedOops`