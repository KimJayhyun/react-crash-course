`loader`는 React Router v6.4 이상에서 **데이터를 사전 로드(preload)** 하기 위한 함수입니다. 라우트가 렌더링되기 전에 데이터를 비동기적으로 불러올 수 있도록 도와줍니다.

---

### 🔍 `loader`의 역할

- 특정 라우트에 진입하기 전에 **필요한 데이터를 미리 로드**합니다.
- 컴포넌트가 렌더링되기 전에 데이터를 받아오므로, 컴포넌트 내부에서 `useEffect`로 데이터를 가져오는 방식보다 **UX가 더 자연스럽고 빠릅니다**.
- `loader` 함수는 보통 `fetch`, `axios`, 또는 다른 비동기 요청을 사용해 데이터를 가져오고, 이를 라우트 컴포넌트에서 `useLoaderData()`로 접근합니다.

---

### 📦 예제 코드 설명

```js
import Post, { loader as postsLoader } from "./routes/Post";
```

- `Post` 컴포넌트와 함께 `loader` 함수를 `postsLoader`라는 이름으로 가져옵니다.
- 아래 라우트 설정에서 `loader: postsLoader`로 사용하고 있죠.

```js
{
  path: "/",
  element: <Post />,
  loader: postsLoader,
}
```

- 이 라우트에 진입하면, 먼저 `postsLoader`가 실행되어 데이터를 받아옵니다.
- `Post` 컴포넌트 내부에서는 `useLoaderData()`를 통해 이 데이터를 사용할 수 있습니다.

---

### 🧠 흐름 요약

1. 사용자가 `/` 경로에 접근
2. `postsLoader` 실행 → 데이터 로딩
3. 데이터가 준비되면 `<Post />` 렌더링
4. `<Post />` 내부에서 `useLoaderData()`로 데이터 사용

---

### ✅ 장점 요약

- 데이터 준비가 끝나기 전에는 컴포넌트가 렌더링되지 않음
  - `Suspense` 이용
- 서버 중심 렌더링이나 prefetching에 유리
- 라우터 중심의 데이터 관리가 가능

---
