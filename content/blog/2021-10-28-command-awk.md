---
title: awk 명령어
tags:
  - Linux
date: 2021-10-28
aliases: 
  - ../articles/2021-10/command-awk
---

## awk 명령어
> Awk scans each input file for lines that match any of a set of patterns specified literally in prog or in one or more files  specified  as  -f progfile.


#### Example
- 읽고 싶은 데이터는 아래와 같다.
```
1) Amit     Physics   80
2) Rahul    Maths     90
3) Shyam    Biology   87
4) Kedar    English   85
5) Hari     History   89
```

#### 3번째 항목과 4번째 항목을 출력하고 싶은 경우?
```shell
# awk '{print $3 "\t" $4}' marks.txt
Physics   80
Maths     90
Biology   87
English   85
History   89
```

#### Rahul가 포함한 라인을 출력하고 싶은 경우?
```shell
# awk '/Rahul/' marks.txt
2) Rahul    Maths     90
```

## Reference
- <https://zzsza.github.io/development/2017/12/20/linux-6/>
