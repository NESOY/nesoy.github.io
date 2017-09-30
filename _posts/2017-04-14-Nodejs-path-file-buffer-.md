---
layout: post
title: NodeJs의 path, File, Buffer
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript]
date: 2017-04-14
---
![No Image](/assets/posts/20170413/1.PNG)

## 경로 다루기
### path

#### 경로 정보
- 현재 실행 파일 경로, 폴더 경로
- `__filename`
- `__dirname`
- `var path = __dirname + '/image.png';`

#### 경로 다듬기
- `path.normalize()`
- `..` : 부모 폴더
- `.` : 같은 폴더

#### 경로 구성 요소
- `path.basename()` : 파일 이름, 경로 중 마지막 요소
- `path.dirname()` : 파일이 포함된 폴더 경로
- `path.extname()` : 확장자

#### 경로 구성 객체
- `var info = pathUtil1.parse('/usr/temp/local/image.png');`

``` javascript
console.log(info);
{ root: '/',
  dir: '/usr/temp/local',
  base: 'image.png',
  ext: '.png',
  name: 'image' }
```

#### 경로 만들기
- `pathUtil.sep` : 구분자 /, \
- `pathUtil.join()` : 경로 붙이기
- `pathUtil.format()` : 경로 만들기

## 파일 시스템
### 파일 시스템 모듈 : fs

#### 주요기능
- 파일 생성/읽기/쓰기/삭제
- 파일 접근성/속성
- 디렉토리 생성/읽기/삭제
- 파일 스트림
- 모든 플랫폼에 100% 호환되지 않음

#### 특징
- 비동기와 동기 방식 함수 모두 제공
- 비동기식 : callback -> non-block
- 동기식 : + Sync -> block 성능상 주의 , 반환값 이용

- 동기식

``` javascript
try{
  var data = fs.readFileSync('textfile.txt','utf8');
}catch(exception){
  console.error('ReadFile Error : ', exception);
}
```

- 비동기식

``` javascript
fs.readFile('textfile.txt','utf8',function(error,data){
  if(err){
    console.error('ReadFile Error : ', exception);
  }else{
    //정상처리
  }
});
```

## 파일 시스템 다루기
### 파일 다루기
#### 파일 다루기
- File descriptor
- File Path

#### FileDescription로 파일 다루기
- `fs.read(fd, buffer, offset, length, position, callback);`
- `fs.readSync(fd, buffer, offset, length, position);`

#### 파일 경로로 파일 다루기
- `fs.readFile(filename, option, callback);`
- `fs.readFileSync(filename, option);`

#### FileDescription 얻기 : Open 함수
- `var fd = fs.openSync(path, flags)`
- `fs.open(path,flags,function(err,fd){});`

#### flag
- `r` : read
- `w` : write
- `a` : add

#### File Close
- `fs.close(fd, callback)`
- `fs.closeSync(fd)`

#### 파일 종류
- 문자열 읽기 : 인코딩
- 바이너리 읽기 : buffer
- 인코딩 설정 안하면 buffer로 읽는다.

#### 파일 읽기 예제 - 파일 디스크립터, 동기식

``` javascript
var fd = fs.openSync(file, 'r'); // Get File descriptor
var buffer = new Buffer(10); // Make Buffer

var byte = fs.readSync(fd, buffer, 0, buffer.length, 0); // Read File
console.log('File Contenst : ', buffer.toString('utf-8')); // Set Encoding

fs.closeSync(fd); // File Close
```

#### 파일 읽기 예제 - 파일 디스크립터, 비동기

``` javascript
fs.open(file,'r',function(err,fd2){
  var buffer2 = new Buffer(20);
  fs.read(fd2, buffer2, 0, buffer2.length, 10, function(err,byteRead,buffer){
    console.log('File Read ', byteRead, 'bytes');
    console.log('File Content : ', buffer.toString('utf-8'));
    fs.close(fd,function(err){});
  })
})
```

#### 파일 읽기 - 동기식
- `var data = fs.readFileSync(file, 'utf-8');`
- `var imageData = fs.readFileSync('./image.jpg');`

#### 파일 읽기 - 비동기, 인코딩
``` javascript
fs.readFile(file, 'UTF-8', function (err,name) {

});
```

### 파일 상태 - 존재 확인
#### 파일 존재 확인하기
- `fs.access(Sync)`
- `fs.stat(Sync)`

#### 파일 접근 가능 확인하기
- `fs.access(path, callback)`
- `fs.accessSync(path, model)`

#### 접근 모드
- `fs.F_OK` : 존재 확인
- `fs.R_OK, W_OK, X_OK` : 읽기 / 쓰기 / 실행 여부 확인

#### 파일 접근 여부 확인 후 읽기 - 동기

``` javascript
try{
  fs.accessSync(file,fs.F_OK);
}catch(exception){
  //파일 없음
}
```

#### 파일 접근 여부 확인 후 읽기 - 비동기

``` javascript
fs.access(file, fs.F_OK | fs.R_OK, function(err){
  if(err){
      //에러 처리
  }
  fs.readFile(file, 'utf8',function(err,data){
    if(err){
      //에러 처리
    }
  })
})
```

### 파일 상태
#### 파일 상태 얻기
- `fs.stat(path, callback)`
- `fs.statSync(path)`
- `stats.isFile()`, `stats.isDirectory()` : 파일, 디렉토리 여부
- `stats.size` : 파일 크기
- `stats.birthtime` : 생성일
- `stats.atime` : 접근 시간
- `stats.mtime` : 수정일

#### 파일 상태 확인 : 동기

``` javascript
try{
  var stats = fs.statSync(file);
}catch(err){
  console.err('Cannot Access File', err);
}
```

#### 파일 상태 확인 : 비동기

``` javascript
fs.stat(file, function(err,stats){
  if(err){
    console.err('Cannot Access File', err);
  }
})
```

### 파일에 저장
- `fs.write(fd, data, callback)`
- `fs.writeFile(filename,data,callback)`
- `fs.writeFileSync(filename,data)`
- `fd,filename` : 파일 디스크립터, 파일 경로
- `fd,data` : 문자열 혹은 Buffer
- `Encoding` : 문자열 저장 시 인코딩
- 같은 파일 이름 -> 덮어쓰기

#### 파일에 내용 추가
- `fs.appendFile(file,data,callback)`
- `fs.appendFileSync(file,data)`

#### 파일 삭제
- `fs.unlink(path, callback)`
- `fs.unlinkSync(path)`

#### 파일 이름 변경/이동
- `fs.rename(oldPath,newPath,callback)`
- `fs.renameSync(oldPath,newPath,callback)`

#### 디렉토리 생성
- `fs.mkdir(path,callback)`
- `fs.mkdirSync(path,callback)`
- 같은 이름의 디렉토리가 있으면 실패

#### 디렉토리 삭제
- `fs.rmdir(path,callback)`
- `fs.rmdirSync(path)`
- 디렉토리가 비어있지 않으면 실패

#### 디렉토리 내 파일 목록
- `fs.readdir(path, callback)`
- `fs.readdirSync(path)`
- 디렉토리가 없으면 에러

#### 파일 스트림 만들기
- `fs.createReadStream(path)`
- `fs.createWriteStream(path)`

## 버퍼
### 버퍼 얻기
#### 파일에서 읽기
- `var fileBuffer = fs.readFileSync('image.jpg');`

#### 네트워크에서 얻기
- `socket.on('data',function(data){})`

#### 버퍼 만들기
- `new Buffer(size)`
- `new Buffer(array)`
- `new Buffer(str)`
- 사이즈는 고정적

#### 모듈 함수
- `Buffer.byteLength(String,encoding)` : 바이트 길이
- `Buffer.compare(buf1,buf2)` : 비교
- `Buffer.concat(list, totallength)` : 붙이기
- `Buffer.isBuffer(obj)` : 버퍼 확인
- `Buffer.isEncoding(encoding)` : 인코딩

#### 객체 메소드
- `buffer.length`
- `buf.fill(value)`
- `buf.slice(start,end)`
- `buf.copy()`
