---
aliases: [/articles/2018-04/Java-JSON]
comments: false
date: 2018-04-26
description: 
tags: [Java]
title: Java JSON 라이브러리에 대해
---
# Java JSON 라이브러리에 대해
## 들어가며
> 프로젝트를 진행하던 과정에서 사용했던 Java JSON 라이브러리에 대해 정리하고 과정에서 겪었던 문제를 공유하고 기록하기 위해 작성합니다. :)

## 왜 사용할까요?
![[assets/posts/20180426/1.png]]

평소에 우리는 Data를 저장하고, 저장한 Data를 읽어 사용자에게 전달하는 작업을 합니다. 그리고 Data를 저장하는 형태는 JSON, XML, CSV, Byte등등 여러가지 있습니다.
Object를 우리가 원하는 형태로 저장하기 위해서는 아래와 같은 변환하는 과정이 필요합니다.

- `Object` -> `JSON, XML, CSV, Byte`
- `JSON, XML, CSV, Byte` -> `Object`

이러한 변환과정을 직접 프로그래밍할 수 있지만 조금 더 편하게 사용하기 위해 라이브러리로 많이 존재합니다.


## 어떤 것들이 존재할까요?
### CSV
- `,`으로 구분하기 때문에 엄청난 크기의 데이터를 저장할 때 주로 사용되는 포맷입니다.
- [Apache Commons CSV](https://commons.apache.org/proper/commons-csv/)
- [opencsv](http://opencsv.sourceforge.net/)

### JSON
- [GSON](https://github.com/google/gson)
- [Jackson](https://github.com/FasterXML/jackson)

## JSON 라이브러리에 대해
### GSON
- 구글에서 만든 Json Mapper입니다.
- 가벼운 JSON 데이터 처리 성능 탁월합니다.
- <https://mvnrepository.com/artifact/com.google.code.gson/gson>

#### Example code - Serialize

```java
public class Gson {
	public static void main(String[] args) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		ActorGson rudyYoungblood = new ActorGson(
				"nm2199632",
				sdf.parse("21-09-1982"),
				Arrays.asList("Apocalypto", "Beatdown", "Wind Walkers")
		);
		Movie movie = new Movie(
				"tt0472043",
				"Mel Gibson",
				Arrays.asList(rudyYoungblood)
		);
		Gson gson = new GsonBuilder().create();
		String serializedMovie = gson.toJson(movie);
		System.out.println(serializedMovie);
	}
}

class ActorGson {
	private String imdbId;
	private Date dateOfBirth;
	private List<String> filmography;
	private int hello;

	ActorGson(String imdbId, Date dateOfBirth, List<String> filmography){
		this.imdbId = imdbId;
		this.dateOfBirth = dateOfBirth;
		this.filmography = filmography;
		this.hello = 10;
	}
}
class Movie {
	private String imdbId;
	private String director;
	private List<ActorGson> actors;

	Movie(String imdbId, String director, List<ActorGson> actors){
		this.imdbId = imdbId;
		this.director = director;
		this.actors = actors;
	}
}
```

#### Result
```json
{
   "imdbId":"tt0472043",
   "director":"Mel Gibson",
   "actors":[
      {
         "imdbId":"nm2199632",
         "dateOfBirth":"Sep 21, 1982 12:00:00 AM",
         "filmography":[
            "Apocalypto",
            "Beatdown",
            "Wind Walkers"
         ],
         "hello":10
      }
   ]
}
```

### Jackson
- 고용량(100MB 이상)의 JSON 데이터 처리 성능이 탁월합니다.
- ObjectMapper에게 Serialize나 Deserialize 옵션을 추가할 수 있습니다.
- Serialize 설정 : <https://github.com/FasterXML/jackson-databind/wiki/Serialization-features>
- Deserialize 설정 : <https://github.com/FasterXML/jackson-databind/wiki/Deserialization-Features>
- Databind 설정 : <https://github.com/FasterXML/jackson-databind/wiki/Databind-annotations>

#### ObjectMapper를 사용할 때 주의해야 할 점.
- Object Mapper생성은 한번만 하는 것으로 권장드립니다 - [Link](https://github.com/naver/kaist-oss-course/issues/11).

![[assets/posts/20180426/2.png]]

- Deserialize하실 때 `Type에 유의`하셔야 합니다. 아래는 제가 겪었던 상황입니다.
#### Object Type의 List

```java
ObjectMapper objectMapper = new ObjectMapper();
List<Object> originList = new ArrayList();
originList.add(123);
originList.add("Ne\"soy");
originList.add(123L);

try {
	String listJSON = objectMapper.writeValueAsString(originList);
	Object readList = objectMapper.readValue(listJSON,List.class);
} catch (JsonProcessingException e) {
	System.out.println(e.getMessage());
} catch (IOException e) {
	System.out.println(e.getMessage());
}
```

![[assets/posts/20180426/3.png]]

- originList 원래 List이고 readList는 Deserialize한 List입니다.
- 2번째 값을 보시면 `Long → Integer`으로 바뀐것을 확인 할 수 있습니다.
- 제가 원했던 값은 Integer가 아니라 Long이지만.. ObjectMapper에서는 그렇게 인식을 하지 못했습니다.

#### 숫자범위가 Integer를 넘어선다면 어떨까요?

![[assets/posts/20180426/4.png]]

- ObjectMapper가 알아서 Long으로 Mapping하는 것을 확인할 수 있습니다.

#### 왜 이렇게 Mapping 될까요?

![[assets/posts/20180426/5.png]]

- TypeFactory의 constructType에서 Typebinding이 일어날때 모호한 Type(List, Map등등)이 있으면 적절한 Type으로 Binding하는 것을 확인할 수 있습니다.
- <https://github.com/FasterXML/jackson-databind/blob/master/src/main/java/com/fasterxml/jackson/databind/type/TypeFactory.java>

#### 해결하려면?
- Jackson의 ObjectMapper를 사용하실 때에는 Type을 명확하게 정의하시는게 `Side Effect`를 줄이는 방법입니다.
	- List → List<String>
	- Map → Map<Long, Object>

### JSON 라이브러리 성능비교 자료
- <https://www.developer.com/lang/jscript/top-7-open-source-json-binding-providers-available-today.html>


## 정리하자면
- Data의 크기와 성질, 사용하는 상황에 따라 어떠한 라이브러리를 사용했을때 장단점을 따져 선택할 수 있습니다.
- 해당 라이브러리에 주의점을 미리 알고 사용하면 발생할 수 있는 버그를 예방할 수 있습니다.
