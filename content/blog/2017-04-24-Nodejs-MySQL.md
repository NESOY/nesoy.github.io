---
title: Nodejs MySQL 연결하기
tags:
  - NodeJs
  - MySQL
date: 2017-04-24
aliases: 
  - ../articles/2017-04/Nodejs-MySQL
---

![[Assets/posts/20170413/1.PNG]]

## MySQL
- `npm install mysql`

![[Assets/posts/20170424/1.PNG]]

### Connection(커넥션)
- `mysql.createConnection(DATABASE_CONFIG)`
- host,port : DBMS 주소와 포트(Default 3306)
- user, password
- database
- multipleStatements : 동시에 여러 SQL 실행. 보안에 주의
- connectTimeout : DBMS 연결 타임 아웃 시간. Default 10,000 ms
- `connect` : 연결
- `end` : 연결 종료
- `query` : SQL문 실행시 커넥션 자동 연결

``` javascript
connection.connect(function(err){
  if(err){
    console.error('error connecting'+err.stack);
    return;
  }
  connection.end();
})
```

### Connection Pool
- 다수의 Connection 관리 기법
- Pool에서 Connection 얻어서 사용하고 Pool에 반납
- `mysql.createPool(option)`
- `waitForConnections` : 풀에 여유 커넥션이 없는 경우 대기 여부
- `connectionLimit` : 최대 커넥션 개수, 기본 10개

``` javascript
var mysql = require('mysql');

var dbConfig = {
   host: 'localhost',
   user: 'root',
   password: '1234',
   port: 3306,
   database: 'nelp'
   connectionLimit : 50
};

var pool = mysql.createPool(dbConfig);
// Get Connection in Pool
pool.getConnection(function(err,connection){
  if(!err){
    //connected!
  }
  // 커넥션을 풀에 반환
  connection.release();
});
```

### SQL 실행
- `connection.query(sql,callback);`
- `affectedRow` : 영향을 받은 열의 개수
- `insertID` : 새로 추가한 경우 Primary Key
- `changedRow` : 변경된 열의 수
- placeholder

### SQL Injection 방지
- `mysql.escape()`
- `placeholder` 사용하기

### Transcation
- `conn.beginTransaction(CB);`
- `conn.commit();` : Transcation 변경 확정
- `conn.rollback();` : Transcation 복구

## Sequelize
- ORM : 객체와 모델의 Mapping
- Promise 기반
- `npm install sequelize`

### 사용하기
- 데이터베이스 연결 설정
- 모델 설정
- 모델을 이용해서 데이터 저장
- 모델에서 데이터 얻어오기
- 모델을 이용해서 데이터 수정/삭제

### 연결설정
- `new Sequelize(uri, option)`
- `dialect` : 데이터베이스 종류
- `host,port`
- `pool` : 커넥션 풀 설정

### Local Connection

``` javascript
var Sequelize = require('sequelize');
var sequelize = new Sequelize('nelp', 'root', 'csedbadmin');
```

### Remote Host Connection Pool

``` javascript
var Sequelize = require('sequelize');
var sequelize = new Sequelize('nelp', 'root', 'csedbadmin',{
  dialect:'mysql',
  host:'RDB_ADDRESS',
  port:3306,

  pool:{
    max:10,
    min:0,
    idle:10000
  }
});
```

### Model Define
- `sequelize.define('name',{attributes}, {options})`

``` javascript
var User = sequelize.define('user', {
        sso_id: {type: Sequelize.STRING, primaryKey: true},
        account_bank: {type: Sequelize.STRING},
        account_number: {type: Sequelize.STRING},
        name: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING}
    }, {
        freezeTableName: true, // Table이름이 변경된다면 이 옵션을 주면 해결할 수 있다.
        timestamps: false,  //  timestamp Default Value가 true이므로 자동으로 입력되는 경우가 있는데 false를 통해 제거 할 수 있다.
    }
);
```

### Model Create

``` javascript
User.create({
       sso_id: 'testNodejs',
       account_bank: 'testNodejs',
       account_number: 'testNodejs',
       name:'testNodejs',
       password:'testNodejs'
}).then(resolved,rejected);
```

- 결과 화면

![[Assets/posts/20170424/2.PNG]]

### Model Read

``` javascript
User.findAll({
      attributes: ['sso_id','account_bank'],
      where:{
          sso_id:'testNodejs'
      }

}).then(resolved,rejected);
```

![[Assets/posts/20170424/3.PNG]]

### Model Update

``` javascript
User.update({
        sso_id: 'testNodejsUpdate',
    },{
        where:{
            sso_id:'testNodejs'
        }
}).then(resolved,rejected);
```

![[Assets/posts/20170424/4.PNG]]

### Model DELETE

``` javascriptÂ
User.destroy({
       where:{
           sso_id:'testNodejsUpdate'
       }
   }).then(resolved,rejected);
```

![[Assets/posts/20170424/5.PNG]]
