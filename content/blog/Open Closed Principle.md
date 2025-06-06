---
aliases: [/articles/2018-01/OCP]
comments: false
date: 2018-01-08
description: 
tags: [DesignPattern]
title: OCP(Open Closed Principle)
---
# OCP(Open Closed Principle)
> 기존의 코드를 변경하지 않으면서 기능을 추가할 수 있도록 설계가 되어야 한다.

## Example

![[assets/posts/20180108/ocp1.png]]

위의 그림처럼 `User`는 `Logic`을 직접적으로 참조하고 가정해보자.
우리는 새로운 두 번째의 `Logic`을 구현하여 `User`에 적용을 해야 한다. 기존의 `User`는 첫 번째 `Logic`을 직접적으로 참조하고 있기 때문에 `User`의 직접적인 변화가 필요하다.

위와 같이 새로운 `Logic`을 추가할때마다 변경을 최소화 하지 않는다면 recompile과 redeploy를 다시 거쳐야 하는 비용이 든다.

이러한 문제를 해결하기 위해서는 OCP(Open Closed Principle) 규칙을 적용하면 된다.

우리는 `File`과 진행상태를 볼 수 있는 `Progress`클래스 2개가 있다.

```php
class File {
    public $length;
    public $sent;
}
```

```php
class Progress {

    private $file;

    function __construct(File $file) {
        $this->file = $file;
    }

    function getAsPercent() {
        return $this->file->sent * 100 / $this->file->length;
    }
}
```

실행화면은 아래와 같다.

```
Testing started at 5:39 PM ...
PHPUnit 3.7.28 by Sebastian Bergmann.
.
Time: 15 ms, Memory: 2.50Mb
OK (1 test, 1 assertion)
```

하지만 여기서 `File`말고 다른 파일종류(`Music`)가 추가가 되면 어떻게 해야할까..?

```php
class Music {

    public $length;
    public $sent;

    public $artist;
    public $album;
    public $releaseDate;

    function getAlbumCoverFile() {
        return 'Images/Covers/' . $this->artist . '/' . $this->album . '.png';
    }
}
```

기존의 `Progress` 클래스는 `File`을 참조하고 있기 때문에 다른 클래스로 확장하기 힘든 구조를 가지고 있다.

따라서 `File`의 종류를 하나의 인터페이스인 `Measurable`로 수정하여 확장하기 쉬운 구조로 변경 할 수 있다. 새로운 `File`형태는 인터페이스를 구현하여 쉽게 추가할 수 있다. 또한 기존의 `Progress`는 변경을 하지 않아도 되는 장점이 있다.

![[assets/posts/20180108/strategy.png]]

아래는 실제 적용한 코드입니다.
```php
interface Measurable {
    function getLength();
    function getSent();
}
```

```php
class File implements Measurable {

    private $length;
    private $sent;

    .....
}
```

```php
class Progress {

    private $measurableContent;

    function __construct(Measurable $measurableContent) {
        $this->measurableContent = $measurableContent;
    }

    function getAsPercent() {
        return $this->measurableContent->getSent() * 100 / $this->measurableContent->getLength();
    }

}
```

## 결론
- `OCP`을 지킴으로써 변경을 최소화하면서 확장을 쉽게 할 수 있다.
- 여러분들의 노력과 시간을 절약해줄 아주 멋진 전략이라는 것.

> 무엇이 변하는 것인지. 무엇이 변하지 않는 것인지 구별하자.

## Reference
- <https://code.tutsplus.com/tutorials/solid-part-2-the-openclosed-principle--net-36600>
