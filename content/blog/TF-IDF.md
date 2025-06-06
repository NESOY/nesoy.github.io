---
aliases: [/articles/2017-11/tf-idf]
comments: false
date: 2017-11-07
description: 
tags: [NLP]
title: TF-IDF(Term Frequency - Inverse Document Frequency) 란?
---
# TF-IDF(Term Frequency - Inverse Document Frequency) 란?
- TF(단어 빈도, term frequency)는 특정한 단어가 `문서 내에 얼마나 자주 등장하는지를 나타내는 값`. 이 값이 `높을수록 문서에서 중요`하다고 생각할 수 있다.
- 하지만 하나의 문서에서 많이 나오지 않고 `다른 문서에서 자주 등장하면 단어의 중요도는 낮아진다`.
- DF(문서 빈도, document frequency)라고 하며, 이 값의 역수를 IDF(역문서 빈도, inverse document frequency)라고 한다.
- TF-IDF는 TF와 IDF를 곱한 값으로 점수가 높은 단어일수록 `다른 문서에는 많지 않고 해당 문서에서 자주 등장하는 단어`를 의미한다.

# 예제

## Twitter 자연어 처리기
- 자연어 처리를 하기 위해 필요하다.
- <https://github.com/open-korean-text/open-korean-text>

- Maven

  ```xml
  <dependency>
    <groupId>org.openkoreantext</groupId>
    <artifactId>open-korean-text</artifactId>
    <version>2.1.0</version>
  </dependency>
  ```

## 문서 정보
- 3가지의 예제 문서가 있다고 가정하자.
![[assets/posts/20171107/1.png]]

```java
private static String[] dataList = {
            "I love dogs", // I, love, dogs
            "I hate dogs and knitting", // I, hate, dogs, and, knitting
            "Knitting is my hobby and my passion", // Knitting, is, my, hobby, and, my, passion
    };
```


## Tf-IDF 모델 정의
```java
class Tf_idf {
    private int tf = 0;
    private double idf = 0;

    public void addTf() {
        this.tf = tf + 1;
    }

    public void setIdf(double idf) {
        this.idf = idf;
    }

    public double getTf_idf() {
        return tf * idf;
    }

    @Override
    public String toString() {
        return String.format("tf = %d | idf = %.2f | tf-idf = %.2f", tf, idf, getTf_idf());
    }
}
```

## Tf값 계산하기
- tf값을 계산하는 방법에는 다양한 방법이 있다.
  - 문서의 길이에 따라 단어의 빈도값을 조절할 수도 있다.
  - boolean 빈도로 한번만 등장해도 1로 값을 정하는 경우도 있다.
  - log를 사용하여 값을 조절할 수도 있다.

- 아래 방법은 기본적으로 나온 횟수를 count한다.
```java
// Tf 계산
for (String data : dataList) {
    // Normalize - 자연어 처리
    CharSequence normalized = OpenKoreanTextProcessorJava.normalize(data);

    // Tokenize - 자연어 처리
    Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(normalized);

    // documentMap 생성
    HashMap<String, Tf_idf> documentMap = new HashMap<String, Tf_idf>();

    // documentMap에 Tf값 입력
    for (String token : OpenKoreanTextProcessorJava.tokensToJavaStringList(tokens)) {
        if (!documentMap.containsKey(token)) {  // document에 token이 없을 경우
            Tf_idf tokenValue = new Tf_idf();
            tokenValue.addTf();

            documentMap.put(token, tokenValue);
        } else {                                // document에 token이 있는 경우
            Tf_idf tokenValue = documentMap.get(token);
            tokenValue.addTf();
        }
    }

    // documentList에 documentMap 추가
    documentList.add(documentMap);
}
```

- 결과값

![[assets/posts/20171107/tf.png]]

## Idf값 계산
- `log(전체문서의 수 / token이 포함된 문서의 수)`

```java
// idf 계산
for (HashMap documentMap : documentList) {
    Iterator<String> tokenList = documentMap.keySet().iterator(); // document token 가져오기

    while (tokenList.hasNext()) {
        String token = tokenList.next();
        Tf_idf tokenValue = (Tf_idf) documentMap.get(token);

        int hit_document = 0;

        for (int index = 0; index < documentList.size(); index++) {
            if (documentList.get(index).containsKey(token)) { // document에 token이 포함한 경우
                hit_document++;
            }
        }
        tokenValue.setIdf(Math.log10((double) documentList.size() / hit_document)); //  log(전체 문서 / hit 문서)
    }
}
```

- 결과값
  - `tf-idf`값이 높을수록 다른 문서에 잘 언급되지 않은 단어(my, love, hate, hobby, is, passion)인 것을 알 수 있다.
  - `tf-idf`값이 낮을수록 다른 문서에 잘 언급하는 단어(I, dogs, and, knitting)인 것을 알 수 있다.

![[assets/posts/20171107/idf.png]]

![[assets/posts/20171107/result.png]]

# 마치며
- Tf-IDF의 목적은 `다른 문서에 자주 언급되지 않고 해당 문서에는 자주 언급되는 token에 대해 점수를 높게 부여하는 것`.
- 정해진 공식은 없다. 분석하는 `데이터에 맞게` Tf-IDF를 변형해가며 다양한 시도를 해보자.

# Source
- <https://github.com/NESOY/tf-idfSample/blob/master/src/main/java/Tf_idfExample.java>

# Reference
- <https://ko.wikipedia.org/wiki/TF-IDF>
- <http://datameetsmedia.com/bag-of-words-tf-idf-explained/>
