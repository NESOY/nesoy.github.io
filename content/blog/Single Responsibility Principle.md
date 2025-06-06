---
aliases: [/articles/2017-12/SRP]
date: 2017-12-12
tags: [DesignPattern]
title: SRP(Single Responsibility Principle)
---
# SRP(Single Responsibility Principle)
> A class should have only one reason to change. // 클래스가 변경될 이유는 단 하나여야 한다.

## Example

아래의 `Book`이라는 클래스는 매우 논리적이고 간단한 클래스처럼 보입니다. 클래스를 통해 제목을 얻을 수도 있고, 작가, 다음페이지, 현재 페이지 내용을 얻을 수 있습니다.

```php
class Book {

    function getTitle() {
        return "A Great Book";
    }

    function getAuthor() {
        return "John Doe";
    }

    function turnPage() {
        // pointer to next page
    }

    function printCurrentPage() {
        echo "current page content";
    }
}
```

하지만 작은 문제가 있습니다. 우리가 쉽게 생각해보았을때 `Book` 클래스를 다루는 행위자가 책을 관리하는 사람이거나, 책을 보여주는 사람 두 분류로 나눌 수 있습니다.

두 분류의 행위자가 원하는 `bussiness logic`이 `Book`클래스에 섞여있습니다. 이런 경우는 `SRP`를 위반한 경우라고 볼 수 있습니다.

```php
class Book {

    function getTitle() {
        return "A Great Book";
    }

    function getAuthor() {
        return "John Doe";
    }

    function turnPage() {
        // pointer to next page
    }

    function getCurrentPage() {
        return "current page content";
    }

}

interface Printer {

    function printPage($page);
}

class PlainTextPrinter implements Printer {

    function printPage($page) {
        echo $page;
    }

}

class HtmlPrinter implements Printer {

    function printPage($page) {
        echo '<div style="single-page">' . $page . '</div>';
    }

}
```
두 가지의 `bussiness logic`을 분류함으로써 `design`의 유연성을 얻을 수 있습니다.


아래의 경우 저장하는 기능이 추가된 `Book`입니다.
```php
class Book {

    function getTitle() {
        return "A Great Book";
    }

    function getAuthor() {
        return "John Doe";
    }

    function turnPage() {
        // pointer to next page
    }

    function getCurrentPage() {
        return "current page content";
    }

    function save() {
        $filename = '/documents/'. $this->getTitle(). ' - ' . $this->getAuthor();
        file_put_contents($filename, serialize($this));
    }

}
```

우리가 저장하는 방법을 바꿀땐 `Book` 클래스를 바꿔야 합니다. 또한 우리가 다음 페이지를 넘기는 과정을 바꿀땐 `Book` 클래스를 바꿔야 합니다. 이 클래스를 바꿔야하는 이유는 여러가지의 변경의 축이 존재합니다.

`save`를 `SimpleFilePersistence` 클래스로 분리시켜 각 클래스가 변경될 이유를 최소화합니다.

```php
class Book {

    function getTitle() {
        return "A Great Book";
    }

    function getAuthor() {
        return "John Doe";
    }

    function turnPage() {
        // pointer to next page
    }

    function getCurrentPage() {
        return "current page content";
    }

}

class SimpleFilePersistence {

    function save(Book $book) {
        $filename = '/documents/' . $book->getTitle() . ' - ' . $book->getAuthor();
        file_put_contents($filename, serialize($book));
    }
}
```

## 결론
- `SRP`을 지킴으로써 `low coupled design`을 얻을 수 있다.
- 하지만 과도한 `SRP`는 최적화 디자인 대신 미완성된 최적화 디자인으로 이끌 수 있다.
- 또한 분산된 작은 `class`로 인해 이해하기 힘든 디자인이 될 수 있다.

## Reference
- <https://code.tutsplus.com/tutorials/solid-part-1-the-single-responsibility-principle--net-36074>
