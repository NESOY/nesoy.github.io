---
title: df 명령어
tags:
  - Linux
date: 2020-10-06
aliases: 
  - ../articles/2020-10/command-df
---

## df 명령어
> display free disk space(파일 시스템의 남은 용량을 보여준다)
-  May 8, 1995에 개발되었다.

```
> df
Filesystem    512-blocks      Used Available Capacity iused      ifree %iused  Mounted on
/dev/disk1s6   976228432  21618616 341158960     6%  488248 4880653912    0%   /
```

#### Option
- `-l`
    - local에 mount된 filesystem만 보여준다.
- `-i`
    - inode 사용 정보를 확인.
- `-h` `-H`
    - Human Readable한 결과물을 보여준다.

```
❯ df -h
Filesystem      Size   Used  Avail Capacity iused      ifree %iused  Mounted on
/dev/disk1s6   466Gi   10Gi  163Gi     6%  488248 4880653912    0%   /
```


## Reference
