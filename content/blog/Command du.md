---
title: du 명령어
date: 2021-12-26
aliases:
  - ../articles/2021-12/command-du
---
# Command du
>  The du utility displays the file system block usage for each file argument and for each directory in the file hierarchy rooted in each directory argument.  If no file is specified, the block usage of the hierarchy rooted in the current directory is displayed.

- 디렉토리와 모든 하위 디렉토리의 용량을 표시

#### Example
- 선택한 디렉토리만의 용량을 표시

```
du -sh /something
du -sh /something/* // 아래도 표기
```

- 가장 많은 용량을 차지하는 디렉토리 찾기

```
du -h --max-depth=1 | sort -hr
```

- directory도 실제 용량을 표시
```
du -h --apparent-size
```

## Reference
