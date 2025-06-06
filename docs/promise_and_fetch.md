## ✅ `Promise` 객체

### 📌 개념

`Promise`는 **비동기 작업의 최종 완료 또는 실패를 나타내는 객체**입니다. 말하자면, 어떤 작업이 지금은 끝나지 않았지만, 언젠가는 끝날 거라는 약속(Promise)을 담고 있는 거죠.

### 📌 상태 (State)

`Promise`는 세 가지 상태를 가질 수 있습니다:

1. `pending` (대기 중): 아직 결과가 없는 상태
2. `fulfilled` (이행됨): 비동기 작업이 성공적으로 완료됨 → `resolve()`
3. `rejected` (거부됨): 비동기 작업이 실패함 → `reject()`

### 📌 기본 사용 예시

```javascript
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("작업 성공!");
  } else {
    reject("작업 실패!");
  }
});

promise
  .then((result) => {
    console.log(result); // "작업 성공!"
  })
  .catch((error) => {
    console.error(error); // "작업 실패!"
  });
```

---

## ✅ `fetch` 함수

### 📌 개념

`fetch()` 함수는 네트워크 요청을 보내기 위한 API로, **HTTP 요청을 비동기적으로 처리**할 수 있게 해줍니다. 이 함수는 `Promise`를 반환하므로 `.then()`이나 `async/await`와 함께 사용할 수 있습니다.

### 📌 기본 사용법

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    return response.json(); // JSON 형태로 변환
  })
  .then((data) => {
    console.log(data); // 서버에서 받아온 데이터
  })
  .catch((error) => {
    console.error("에러 발생:", error);
  });
```

### 📌 `async/await` 방식

```javascript
async function getData() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("에러 발생:", error);
  }
}
```

---

## 🧠 정리

| 개념      | 설명                                              |
| --------- | ------------------------------------------------- |
| `Promise` | 비동기 작업의 완료/실패를 나타내는 객체           |
| `fetch`   | 네트워크 요청을 보내는 함수로, `Promise`를 반환함 |

이 둘은 함께 쓰이는 경우가 많고, 자바스크립트의 **비동기 흐름 제어**에 필수적인 도구들이에요.
