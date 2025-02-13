---
title: RedBlack Tree에 대해
date: 2018-08-31
aliases: 
  - ../articles/2018-08/Algorithm-RedblackTree
---

![[Assets/logo/algorithm.png]]

## RedBlack Tree 왜(Why) 생긴 것일까요?
> 7,6,5,4,3,2,1 순서대로 삽입해서 이진탐색 트리(Binary Search Tree)를 만들어 보면 어떨까요?

![[Assets/posts/20180831/1.png]]

- 위의 그림과 같이 한쪽으로 치우친 Tree가 완성됩니다.

### 1을 찾으려고 한다면?
- 항상 트리의 높이만큼 시간이 필요합니다.
- 그렇다면 이진탐색 트리(Binary Search Tree)를 사용하는 이유가 없겠죠?
- 이러한 문제점을 해결하기 위해 나온 자료구조가 Balanced binary search tree의 한 종류인 RedBlack Tree입니다.


## RedBlack Tree란?
- 각 노드에 색깔을 저장하는 공간을 추가하여 색깔을 기준으로 균형을 맞추는 트리입니다.

![[Assets/posts/20180831/2.png]]

### RedBlack Tree Rule
- 모든 노드는 RED이거나 BLACK이다.
- 루트는 BLACK이다.
- 모든 리프(NIL)는 BLACK이다.
- 노드가 RED이면 그 노드의 자식은 모두 BLACK이다. // NO Double Red
- 각 노드로부터 그 노드의 자손인 리프로 가는 경로들은 모두 같은 수의 BLACK 노드를 포함한다.

#### NIL을 하나의 객체로 관리한다면?
- 하나의 Node로 관리하기 때문에 메모리를 절약할 수 있습니다.

![[Assets/posts/20180831/3.png]]

### RedBlack Tree Insert
- 삽입되는 모든 노드의 색깔은 RED로 시작합니다.
> 8,18,5,15,17,25,40,80


#### Step 1 : Insert 8

![[Assets/posts/20180831/4.png]]

- 루트는 흑색인 규칙에 따라 8을 블랙으로 변경됩니다.



#### Step 2 : Insert 18

![[Assets/posts/20180831/5.png]]

#### Step 3 : Insert 5

![[Assets/posts/20180831/6.png]]

#### Step 4 : Insert 15

![[Assets/posts/20180831/7.png]]

- `RED 노드가 연속적으로 나올 수 없다` 규칙을 위반했습니다.
- 연속된 RED가 나오게 된다면 이를 해결하기 위해 두 가지 해결방법을 사용하고 있습니다.
  - Recoloring
    - 삽입된 노드의 부모의 형제 색깔이 RED인 경우
  - Restructuring
    - 삽입된 노드의 부모의 형제 색깔이 BLACK인 경우, NULL인 경우

- 현재 상황은 15 노드의 부모의 형제 색깔이 RED이기 때문에 Recoloring으로 진행합니다.
  - 삽입된 노드의 부모와 부모 형제노드를 BLACK으로 부모의 부모노드를 RED로 Coloring합니다.
  - 부모의 부모노드가 Root Node인 경우 `Root Node인 경우 Black인 규칙`에 의해 변경되지 않습니다.
    - 부모의 부모노드가 Root node가 아닌 경우 Double Red가 다시 발생 할 수 있습니다.



#### Step 5 : Insert 17

![[Assets/posts/20180831/8.png]]

- 삽입된 노드의 부모의 형제 색깔이 NULL이기 때문에 Restructuring으로 진행합니다.
  - 삽입된 노드, 부모, 부모의 부모(Grand Parent) 오름차순으로 정렬합니다.
  - 중앙 값을 부모 노드로 만들고 나머지 노드를 자식으로 변환합니다.
  - 부모 노드가 된 노드를 BLACK 나머지 노드를 RED로 Coloring합니다.



#### Step 6 : Insert 25

![[Assets/posts/20180831/9.png]]

- `RED 노드가 연속적으로 나올 수 없다` 규칙을 위반했습니다.
- 삽입된 노드의 부모의 형제 색깔이 RED인 경우에 해당됩니다.
  - Recoloring으로 규칙을 위반하지 않게 조정합니다.
  - 삽입된 노드의 부모와 부모 형제노드를 BLACK으로 부모의 부모노드를 RED로 Coloring합니다.



#### Step 7 : Insert 40

![[Assets/posts/20180831/10.png]]

- 삽입된 노드의 부모의 형제 색깔이 NULL이기 때문에 Restructuring으로 진행합니다.
  - 삽입된 노드, 부모, 부모의 부모(Grand Parent) 오름차순으로 정렬합니다.
  - 중앙 값을 부모 노드로 만들고 나머지 노드를 자식으로 변환합니다.
  - 부모 노드가 된 노드를 BLACK 나머지 노드를 RED로 Coloring합니다.


#### Step 7 : Insert 80

![[Assets/posts/20180831/11.png]]

- `RED 노드가 연속적으로 나올 수 없다` 규칙을 위반했습니다.
- 삽입된 노드의 부모의 형제 색깔이 RED인 경우에 해당됩니다.
  - Recoloring으로 규칙을 위반하지 않게 조정합니다.
  - 삽입된 노드의 부모와 부모 형제노드를 BLACK으로 부모의 부모노드를 RED로 Coloring합니다.
- Recoloring이 끝난 이후에 보니 Double Red가 재발생했습니다.
  - 25 노드의 부모의 형제 색깔이 BLACK이기 때문에 Restructuring으로 진행합니다.
    - 삽입된 노드, 부모, 부모의 부모(Grand Parent) 오름차순으로 정렬합니다.
    - 중앙 값을 부모 노드로 만들고 나머지 노드를 자식으로 변환합니다.
    - 부모 노드가 된 노드를 BLACK 나머지 노드를 RED로 Coloring합니다.

> 가장 마지막 Step에 오타로 Node 8 -> Node 10으로 바뀌었습니다.




### RedBlack Tree Remove
- RB 트리에서 검정색 노드를 삭제할 때는 삭제 연산으로 RB 트리의 속성이 깨지지 않도록 해야 합니다.
- Insert 때 고려했던 것과 유사한 방식으로 rotation을 구현함으로써 해결할 수 있습니다.
  - 다만 빨간색 노드를 삭제할 때는 그냥 삭제를 수행하면 된다고 합니다.


### RedBlack Tree 복잡도(Complexity)에 대해

| Algorithm | Average | Worst case |
| ---| --- | --- |
| Space | O(n) | O(n) |
| Search | O(log n) | O(log n) |
| Insert | O(log n) | O(log n) |
| Delete | O(log n) | O(log n) |


### AVL Tree와 Red Black Tree 차이에 대해
- AVL Tree가 Red Black Tree보다 빠른 Search를 제공합니다.
  - AVL Tree가 더 엄격한 Balanced를 유지하고 있기 때문입니다.
- Red Black Tree은 AVL Tree보다 빠른 삽입과 제거를 제공합니다.
  - AVL Tree보다 Balanced를 느슨하게 유지하고 있기 때문입니다.
- Red Black Tree는 AVL Tree보다 색깔을 저장하기 위해 더 많은 Space Complexity가 필요합니다.
- Red Black Trees는 대부분의 언어의 map, multimap, multiset에서 사용하고 있습니다.
- AVL tree는 조회에 속도가 중요한 Database에서 사용하고 있습니다.


## Reference
- <http://zeddios.tistory.com/237>
- <http://btechsmartclass.com/DS/U5_T4.html>
- <https://ratsgo.github.io/data%20structure&algorithm/2017/10/28/rbtree/>
- <https://www.geeksforgeeks.org/red-black-tree-vs-avl-tree/>
