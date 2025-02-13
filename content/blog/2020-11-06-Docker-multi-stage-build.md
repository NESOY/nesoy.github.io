---
title: Docker Multi Stage란?
tags:
  - Docker
date: 2020-11-06
aliases: 
  - ../articles/2020-11/Docker-multi-stage-build
---

## Docker Multi Stage란?
> 컨테이너 이미지를 만들면서 빌드 등에는 필요하지만 최종 컨테이너 이미지에는 필요 없는 환경을 제거할 수 있도록 단계를 나누어서 기반 이미지를 만드는 방법

## Background
- Docker가 등장한 이후 Docker Image를 작게 만들기 위한 노력들이 있었습니다.
    - Image가 작으면 작을 수록 빌드, 배포 시간이 짧아 지기 때문입니다.
- 각각의 Instruction들은 Dockerfile 하나의 Layer로 추가가 되기 때문에 여러가지 최적화가 필요했습니다.
- Docker Image를 가볍게 만들기 위해 나온 방법이 Multi Stage 방식입니다.

#### Multi Stage build 방식이 나오기 전에
- builder-pattern을 활용했습니다.
    - 하나의 Dockerfile이 아닌 두 가지의 Dockerfile을 유지하는 것입니다.

- `Dockerfile.build`
    - 여러 명령어를 실행하는 데 분리하지 않고 `&&` `\`를 통해 하나의 Layer에서 처리할 수 있습니다.
    - 빌드를 위한 이미지 입니다.

```Dockerfile
FROM golang:1.7.3
WORKDIR /go/src/github.com/alexellis/href-counter/
COPY app.go .
RUN go get -d -v golang.org/x/net/html \ -> 하나의 Layer에서 명령어를 처리하기 위한 최적화
  && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .
```

- `Dockerfile`
    - 어플리케이션을 실행하기 위한 Dockerfile입니다.

```Dockerfile
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY app .
CMD ["./app"]
```

- `build.sh`
    - Multi stage를 지원하기 전에는 이렇게 따로 스크립트를 작성해야 했습니다.

```bash
#!/bin/sh
echo Building alexellis2/href-counter:build

# build image
docker build --build-arg https_proxy=$https_proxy --build-arg http_proxy=$http_proxy \
    -t alexellis2/href-counter:build . -f Dockerfile.build

docker container create --name extract alexellis2/href-counter:build
docker container cp extract:/go/src/github.com/alexellis/href-counter/app ./app
docker container rm -f extract

echo Building alexellis2/href-counter:latest

# run app
docker build --no-cache -t alexellis2/href-counter:latest .
rm ./app
```


#### Multi Stage가 등장하면서
- 하나의 Dockerfile로 빌드 이미지와 실행 이미지를 분리할 수 있게 되어 훨씬 간편하게 이미지를 줄일 수 있게 되었습니다.
    - 뿐만 아니라 배포 이미지의 용량이 줄어 빌드 시간이 감소하게 되었습니다.

```Dockerfile
FROM golang:1.7.3 AS builder
WORKDIR /go/src/github.com/alexellis/href-counter/
RUN go get -d -v golang.org/x/net/html
COPY app.go    .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/github.com/alexellis/href-counter/app .
CMD ["./app"]
```


## Reference
- <https://docs.docker.com/develop/develop-images/multistage-build/>
