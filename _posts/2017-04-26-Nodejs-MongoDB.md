---
layout: post
title: Nodejs MongoDB 연결하기, Mongoose
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript,MongoDB]
date: 2017-04-26
---

![No Image](/assets/20170413/1.PNG)

## MongoDB
- MongoDB install : <https://nesoy.github.io/articles/2017-04/MongoDB>

- `Mongoose` : ODM( Object Document Mapper)

## MongoDB Driver
- mongo 콘솔 클라이언트 명령과 동일하게 조작
- `npm install mongodb`

### MongoClient
- `var MongoClient = require('mongodb').MongoClient;`
- `MongoClient.connect(url,option,callback)`
- callback : function(error,db);

``` javascript
var var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/DATABASE';
var db;

MongoClient.connect(url, function (err, database) {
   if (err) {
      console.error('MongoDB 연결 실패', err);
      return;
   }

   db = database;
});
```

### Collection 가져오기

``` javascript
var var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/DATABASE';
var db;

MongoClient.connect(url, function (err, database) {
   if (err) {
      console.error('MongoDB 연결 실패', err);
      return;
   }

   db = database;
});

var movies = db.Collection('movies');
movies.insert();
```

### Document Insert
- `insert(docs, options, callback)`
- `insertMany(docs, options, callback)`
- `insertOne(doc, options, callback)`
- Promise기반, 반환값이 Promise

``` javascript
  // Promise Based  
  movies.insert({ title:'스타워즈7', director:'JJ 에이브럼스', year:2015}).then(function(results) {
     // console.log('== Resolved\n', results);
     console.log('Promise Based Insert Result : ', results);
  }, function(err) {
     console.log('== Rejected\n', err);      
  });
```

### Document find
- `find` : Cursor
- `findOne(query, options, callback)`

``` javascript
// 콜렉션
var movies = db.collection('movies');

// 전체 목록
movies.find().toArray(function (err, docs) {
   console.log('== Find ALL, toArray');
   console.log(docs);
});

// projection
var projection = { _id: 0, title: 1 };
movies.find({}, projection).toArray(function (err, docs) {
   console.log('== Find ALL with Projection');
   console.log(docs);
});

// Query
movies.find({ title: '인터스텔라' }).toArray(function (err, docs) {
   console.log('== Find 인터스텔라');
   console.log(docs);
});

// Query : db.movies.find({year:{$gt:2000} })
movies.find({ year: { $gt: 2000 } }).toArray(function (err, docs) {
   console.log('== 2000년 이후의 영화');
   console.log(docs);
});

// Query : db.movies.find({ $or:[ { year: {$gt:2000} },{ director:"크리스토퍼 놀란" } ] } )
movies.find({ $or: [{ year: { $gt: 2000 } }, { director: "크리스토퍼 놀란" }] }).toArray(function (err, docs) {
   console.log('== OR Query');
   console.log(docs);
});

// limit(5)
movies.find({}).limit(2).toArray(function (err, docs) {
   console.log('== limit');
   console.log(docs);
});

// ObjecdtID
movies.findOne({}).then(function(result) {
   var objectIDStr = result._id.toString();

   movies.findOne({_id:objectIDStr}).then(function(result) {
      console.log('Find By ID Str : \n', result);
   }, function(err) {
      console.log('Find By ID Str Error : ', err);
   });

   movies.findOne({_id:new ObjectID(objectIDStr)}).then(function(result) {
      console.log('Find By ObjectID : \n', result);
   }, function(err) {
      console.log('Find By ObjectID Error : ', err);
   });
});
```

### Document Update

``` javascript
var movies = db.collection('movies');

   // Update One
   movies.updateOne({ title: '스타워즈' }, { $set: { title: 'StarWars' } }, function (err, result) {
      if (err) {
         console.error('UpdateOne Error ', err);
         return;
      }
      console.log('UpdateOne 성공 ', result);
   });

   // Update Multi Option - Promise Based
   movies.update(
      { director: '크리스토퍼 놀란' },
      { $set: { director: 'Christopher Nolan' } }, { multi: true }).then(
      function resolved(results) {
         console.log('Update Success. Promise Based Result : ', results);
       },
      function rejected(err) {
         console.error('Update Error. Rejected : ', err);
    });
```

### Document Delete

``` javascript
var movies = db.collection('movies');

   // Delete One
   movies.deleteOne({title:'스타워즈'}, function(err, result) {
      if ( err ) {
         console.error('DeleteOne Error ', err);
         return;
      }      
      console.log('DeleteOne 성공 ', result);
   });

   // Delete Many Documents
   movies.deleteMany({director:'크리스토퍼 놀란'}).then(function resolved(result) {
      console.log('Delete Many Success : ', result);
   }, function rejected(err) {
      console.log('Delete Many Fail : ', err);
   });   
```

## Mongoose
- ODM : Object Document Mapper
- `npm install mongoose`
- 데이터베이스 연결
- 스키마 정의
- 스키마에서 모델
- 모델을 이용해서 데이터 다루기

### 데이터베이스 연결

``` javascript
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/Nelp';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', function(err) {
   console.log('Error : ', err);
});
db.on('open', function() {
   console.log('Open Event');
});
```

### 스키마 정의

``` javascript
var MovieScheme = mongoose.Schema({
  title : String,
  director : String,
  year : Number,
  synopsis : String
});
var Movie = mongoose.model('Movie', MovieScheme);
```

### Error 처리
- mongoose v4 이상의 버전부터 mongoose의 save()와 쿼리같은 비동기 동작에서는 Promises/A+ conformant pomises를 반환하게 되어있다.

![No Image](/assets/20170426/1.PNG)

- `mongoose.Promise = global.Promise;` 추가하면 해결된다.

### `__v` 제거하기
- `versionKey`가 Default로 들어간다.

![No Image](/assets/20170426/2.PNG)

``` javascript
var UserSchema = new mongoose.Schema({
    nickname: String,
    reg_time: {type: Date, default: Date.now}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
```


### Document Insert
- `Model.save(function(err,product));` : Callback
- `Model.save().then(resolved,rejected);` : Promise

``` javascript
// Promise Based
  // notDefined는 스키마에 정의된 항목이 아니다. - 저장 안됨
  var starwars = new Movie({title:'스타워즈7', director:'JJ 에이브럼스', year:2015, notDefined:true});
  starwars.save().then(function(product) {
     console.log('Save Resolved : ', product);
  }, function rejected(err) {
     console.log('Save Rejected : ', err);
  });   

  Movie.create({title:'아바타', director:'제임스 카메론', year:2010}).then(resolved, rejected);
  Movie.create({ title: '다크 나이트', director: '크리스토퍼 놀란', year: 2008 }).then(resolved, rejected);
```

### Document Find

``` javascript
// 콜백을 이용한 검색
  Movie.find({year:{$gt:2010}}, function(err, docs) {
     console.log(docs);
  });   

  // 쿼리 객체 - exec를 이용하는 방법
  Movie.findOne({title:'인터스텔라'}).exec(function(err, docs) {
     console.log(docs);
  });   

  Movie.where('year').gt(2010).exec(function(err, docs) {
     console.log('year > 20!0 : ', docs);
  });
```

### Document Update

``` javascript
// 도큐먼트 수정 후 저장
   Movie.findOne({title:'아바타'}).exec(function(err, doc) {
      if ( doc ) {
         doc.title = 'Avata';
         doc.save(function(err, product) {
            console.log('Modify and Save : ', product);
         });         
      }
   });

   Movie.update({director:'크리스토퍼 놀란'}, {$set:{director:'Christopher Nolan'}} ).then(resolved, rejected);
```

### Document Delete

``` javascript
// 도큐먼트 삭제
Movie.findOne({title:'아바타'}).exec(function(err, doc) {
   if ( doc ) {
      doc.title = 'Avata';
      doc.remove(function(err, product) {
         console.log('Find and Remove : ', err, product);
      });         
   }
});

Movie.remove({director:'크리스토퍼 놀란'}).then(resolved, rejected);
```

## Reference
- <http://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongodb>
