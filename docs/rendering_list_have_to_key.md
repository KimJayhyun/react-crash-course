> [React 공식문서](https://react.dev/learn/rendering-lists#rendering-data-from-arrays)

### 🔢 배열에서 데이터 렌더링하기

HTML에서 리스트를 작성할 때 다음과 같이 `<ul>`과 `<li>` 태그를 사용하지:

```html
<ul>
  <li>Creola Katherine Johnson: 수학자</li>
  <li>Mario José Molina-Pasquel Henríquez: 화학자</li>
  <li>Mohammad Abdus Salam: 물리학자</li>
  <li>Percy Lavon Julian: 화학자</li>
  <li>Subrahmanyan Chandrasekhar: 천체물리학자</li>
</ul>
```

이처럼 **데이터만 다르고 구조는 동일한 UI**를 반복해서 렌더링해야 할 일이 많아. 댓글 목록, 프로필 이미지 갤러리 등이 그 예시야. 이런 경우 데이터를 **JavaScript 배열**에 담아 `map()` 같은 메서드로 React 컴포넌트를 생성할 수 있어.

---

### 📦 1단계: 데이터를 배열로 분리하기

```js
const people = [
  'Creola Katherine Johnson: 수학자',
  'Mario José Molina-Pasquel Henríquez: 화학자',
  'Mohammad Abdus Salam: 물리학자',
  'Percy Lavon Julian: 화학자',
  'Subrahmanyan Chandrasekhar: 천체물리학자'
];
```

---

### 🔁 2단계: `map()`으로 JSX 요소 배열 만들기

```js
const listItems = people.map(person => <li>{person}</li>);
```

---

### 🔄 3단계: JSX 요소를 `<ul>`에 감싸서 렌더링하기

```jsx
export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```

---

### ⚠️ 경고: 고유한 `key` prop 필요

이 코드를 실행하면 **React 콘솔에 다음과 같은 경고 메시지**가 뜰 거야:

```
Warning: Each child in a list should have a unique "key" prop.
```

> 리스트 안에 있는 각 항목은 **고유한 `key` 속성**을 가져야 해. 그래야 react가 항목을 효율적으로 업데이트하고 렌더링할 수 있어.

---

## 🧠 왜 `key`가 필요할까?

React에서 `key`는 단순한 식별자가 아니라 **렌더링 최적화의 핵심 요소**야.

React는 **Virtual DOM**을 사용해서 실제 DOM에 효율적으로 반영하는 방식을 써.
컴포넌트가 업데이트되면 React는 다음 두 가지를 비교해:

1. 📦 **기존 Virtual DOM (업데이트 전)**
2. 📦 **새로운 Virtual DOM (업데이트 후)**

그리고 둘의 차이를 비교(diff)해서 실제 DOM에 최소한의 변경만 적용해.

---

## 🔍 여기서 `key`가 하는 일은?

React가 `<li>` 같은 **반복되는 요소들을 비교할 때**, 어떤 항목이:

* 그대로 유지됐는지?
* 수정됐는지?
* 새로 생겼는지?
* 삭제됐는지?

를 알아야 해.

이때 **`key`는 React가 각 항목을 추적하는 기준**이 돼.
고유한 `key`가 있으면 React는 **불필요하게 요소를 다시 생성하거나 삭제하지 않고**, 실제 변경된 항목만 정확히 업데이트할 수 있어.

---

## 💥 예시 없이 못 참지

```jsx
const people = ['Alice', 'Bob', 'Charlie'];
```

렌더링:

```jsx
<ul>
  {people.map(person => <li>{person}</li>)}
</ul>
```

이렇게 하면 React는 `key`가 없어서, 요소의 변경 여부를 "위치(index)"로만 추측해.
그런데 만약 Bob이 삭제되면?

```js
const people = ['Alice', 'Charlie'];
```

React는 두 번째 `<li>`(Charlie)를 **Bob이 바뀐 거라고 오해**해서 **불필요하게 다시 렌더링**할 수도 있어.

---

## ✅ 해결책: 고유한 `key` 사용

```jsx
<ul>
  {people.map(person => <li key={person}>{person}</li>)}
</ul>
```

이렇게 하면 React는 `person` 값이 고유하다는 걸 알고, **정확히 어떤 항목이 삭제되거나 추가됐는지 빠르게 판단**할 수 있어.

---

## 📌 요약

| 개념           | 설명                                    |
| ------------ | ------------------------------------- |
| `key`란?      | 리스트 항목을 고유하게 식별하는 값                   |
| 왜 필요?        | React가 변경된 항목만 정확히 찾아내고 렌더링을 최적화하기 위해 |
| 없으면?         | 불필요한 DOM 조작이 발생해 성능 저하                |
| 이상적인 `key`는? | 고유하고 변하지 않는 값 (ex. ID, 이름 등)          |
