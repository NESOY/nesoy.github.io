## Node Affinity
- requiredDuringSchedulingIgnoredDuringExecution
- preferredDuringSchedulingIgnoredDuringExecution
- requiredDuringSchedulingRequiredDuringExecution
- preferredDuringSchedulingRequiredDuringExecution

- require
    - 조건을 반드시 충족해야 하는지 선호되는지 정도의 차이이다.
- IgnoredDuringExecution // RequiredDuringExecution의 차이는 Runtime에 Node label이 바뀌더라도 무시할것인지 즉시 eviction할건인지에 대한 스켸줄링