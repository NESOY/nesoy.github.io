## Docker Command EntryPoint 차이에 대해

## CMD
- Optional
    - 대체가 가능하다.
- https://docs.docker.com/engine/reference/builder/#cmd

## EntryPoint
- 무조건 실행해야 하는 조건이 있다.
- https://docs.docker.com/engine/reference/builder/#entrypoint

#### 주의해야 할점
- 컨테이너가 수행될 때 변경되지 않을 실행 명령은 CMD 보다는 ENTRYPOINT로 정의하는게 좋다.
- 메인 명령어가 실행시 default option인자 값은 CMD로 정의해주는게 좋다.
- ENTRYPOINT와 CMD는 리스트 포맷으로 정의해주는게 좋다.

## Reference
- <https://bluese05.tistory.com/77>