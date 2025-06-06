# 🔁 React 컴포넌트에서 무한 루프가 발생하는 이유와 해결법

React로 프로젝트를 만들다 보면, \*\*"왜 내 컴포넌트가 무한 루프에 빠지지?"\*\*라는 문제를 겪게 되는 경우가 종종 있습니다. 특히 **데이터를 fetch할 때** 이런 문제가 자주 발생합니다. 이 포스트에서는 무한 루프가 발생하는 이유와 그것을 어떻게 피할 수 있는지 쉽게 설명드릴게요.

---

## 🔥 문제 상황: 컴포넌트가 계속 다시 실행됨

다음은 게시글 목록을 가져오는 React 컴포넌트 예시입니다:

```jsx
function PostsList() {
  fetch("http://example.com/posts").then((response) =>
    response.json().then((data) => {
      setPosts(data.posts);
    })
  );

  const [posts, setPosts] = useState([]);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.body}</li>
      ))}
    </ul>
  );
}
```

처음 보면 괜찮아 보이지만, 이 코드는 **무한 루프**에 빠질 수 있습니다.

---

## 🤔 왜 무한 루프에 빠질까?

React에서는 컴포넌트가 상태(`state`)나 props가 변경되면 **다시 렌더링**합니다. 그리고 **렌더링된다는 건, 컴포넌트 함수가 다시 호출된다는 의미**입니다.

따라서 위 코드에서는 다음과 같은 일이 발생합니다:

1. 컴포넌트가 렌더링됨
2. `fetch` 실행 → `setPosts()` 호출
3. 상태가 변경되었으므로 컴포넌트 다시 렌더링
4. 컴포넌트 함수가 다시 실행됨 → `fetch` 또 실행
5. 다시 `setPosts()` 호출 → 또 렌더링 → 또 fetch... 🔁 **무한 반복**

---

## ✅ 해결책: `useEffect` 사용하기

이런 문제를 방지하려면, 데이터를 불러오는 작업은 **`useEffect` 훅을 이용해 컴포넌트가 처음 마운트될 때 한 번만 실행**해야 합니다.

```jsx
import { useState, useEffect } from "react";

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://example.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []); // 👈 빈 배열: 마운트 시 한 번만 실행

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.body}</li>
      ))}
    </ul>
  );
}
```

### 📌 `useEffect`의 두 번째 인자 `[]`의 의미는?

- `[]`는 **dependencies array**입니다.
- 이 배열이 비어 있으면, `useEffect`는 컴포넌트가 **처음 화면에 나타날 때 딱 한 번만 실행**됩니다.
- 상태가 바뀌거나 렌더링이 다시 돼도, 다시 실행되지 않습니다.

---

## 📚 요약 정리

| 개념                | 설명                                                             |
| ------------------- | ---------------------------------------------------------------- |
| **컴포넌트 렌더링** | `function MyComponent()` 함수가 다시 호출되는 것                 |
| **렌더링 트리거**   | `useState()`로 상태가 바뀌거나 부모로부터 받은 props가 변경될 때 |
| **무한 루프 원인**  | 렌더링 때마다 `fetch → setState → 렌더링` 반복                   |
| **해결책**          | `useEffect`로 한 번만 `fetch`하도록 제어                         |

---

## ✨ 마무리

React는 함수형 컴포넌트 구조라서 \*\*"렌더링이 되면 함수가 다시 실행된다"\*\*는 개념을 이해하는 것이 정말 중요합니다. 특히 외부 API 요청처럼 \*\*부작용(side effect)\*\*을 일으키는 코드는 반드시 `useEffect`로 안전하게 다뤄야 해요.

혹시 `useEffect`의 의존성 배열이나 추가적인 상태 관리 방법에 대해 더 궁금하신 점이 있다면 댓글로 질문 주세요! 😊
