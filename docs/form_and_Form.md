# 🌐 웹 폼 완전 정복: HTML `<form>`, multipart 데이터 전송, React Router의 `<Form>`까지

HTML의 `<form>`은 가장 기본적이면서도 웹에서 데이터 입력을 처리하는 강력한 수단입니다.

이 포스트에서는 기본적인 form의 동작 원리부터, multipart 파일 전송 방식,

그리고 React Router v6.4 이상에서의 `<Form>` 및 `action` 사용법까지 풍부한 예제와 함께 깊이 있게 살펴봅니다.

---

## 🧾 목차

1. HTML `<form>`의 기본 구조와 동작 원리
2. `enctype`과 HTTP 헤더
3. 전송 데이터의 실제 HTTP 요청 예시
4. 서버에서 form 데이터 받기 (Node.js / Flask / PHP)
5. 파일 업로드: `multipart/form-data`의 구조와 처리
6. JavaScript에서 `<form>` 제어하기 (`fetch`, `FormData`)
7. React Router의 `<Form>`과 `action` 구조
8. 마무리: 상황에 따라 적절한 form 전략 선택하기

---

## 📌 1. HTML `<form>`의 기본 구조

HTML의 `<form>` 태그는 사용자의 입력 데이터를 수집하고 서버에 전송하기 위한 표준 태그입니다.

```html
<form action="/submit" method="POST">
  <input name="username" value="jane" />
  <input name="password" value="secret" />
  <button type="submit">Login</button>
</form>
```

### 주요 속성

| 속성      | 설명                                                             |
| --------- | ---------------------------------------------------------------- |
| `action`  | 데이터를 전송할 서버의 URL                                       |
| `method`  | `GET` 또는 `POST` 등 HTTP 메서드                                 |
| `enctype` | 데이터 인코딩 방식 (기본값: `application/x-www-form-urlencoded`) |

---

## 📡 2. `enctype`과 Content-Type 헤더

HTML `<form>`은 `enctype` 속성에 따라 **서버로 데이터를 어떻게 인코딩하여 전송할지** 결정합니다. 이 값은 브라우저가 자동으로 HTTP `Content-Type` 헤더에 반영합니다.

| enctype                             | Content-Type 헤더                   | 설명                                      |
| ----------------------------------- | ----------------------------------- | ----------------------------------------- |
| `application/x-www-form-urlencoded` | `application/x-www-form-urlencoded` | 기본값. 키-값 쌍을 URL 인코딩하여 전송    |
| `multipart/form-data`               | `multipart/form-data; boundary=...` | 파일 포함 가능. 각 필드를 boundary로 분리 |
| `text/plain`                        | `text/plain`                        | 디버깅용. 특수문자 인코딩 안 됨           |

---

## 📦 3. 요청 예시: form 전송 시 실제 HTTP 내용

### HTML

```html
<form action="/submit" method="POST">
  <input name="username" value="jane" />
  <input name="password" value="secret" />
</form>
```

### HTTP 요청

#### 요청 헤더

```
POST /submit HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

#### 요청 본문

```
username=jane&password=secret
```

---

## ⚙️ 4. 서버에서 데이터 수신하기

### 4.1 Node.js (Express)

```bash
npm install express
```

```js
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  console.log("username:", req.body.username);
  console.log("password:", req.body.password);
  res.send("Received");
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
```

---

### 4.2 Python (Flask)

```bash
pip install flask
```

```python
from flask import Flask, request
app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit():
    print('Username:', request.form.get('username'))
    print('Password:', request.form.get('password'))
    return 'Form received', 200

app.run(debug=True, port=3000)
```

---

## 📎 5. 파일 업로드 (multipart/form-data)

### HTML (다중 파일 업로드)

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
  <input name="photos" type="file" multiple />
  <button type="submit">Upload</button>
</form>
```

### 요청 본문 구조 (요약)

```
------WebKitFormBoundary
Content-Disposition: form-data; name="photos"; filename="img1.jpg"

(binary data)
------WebKitFormBoundary
Content-Disposition: form-data; name="photos"; filename="img2.jpg"

(binary data)
------WebKitFormBoundary--
```

---

### Node.js 서버 예시 (multer 사용)

```bash
npm install express multer
```

```js
const express = require("express");
const multer = require("multer");
const app = express();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/upload", upload.array("photos", 10), (req, res) => {
  console.log(req.files); // 배열
  res.send("Files uploaded!");
});

app.listen(3000);
```

---

## 💡 6. JavaScript에서 form 제어하기 (AJAX 방식)

### 기본 HTML 폼을 fetch로 비동기 전송

```html
<form id="loginForm">
  <input name="username" />
  <input name="password" type="password" />
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("/submit", {
      method: "POST",
      body: formData,
    });

    const result = await res.text();
    console.log(result);
  });
</script>
```

> `FormData`를 사용할 때는 `Content-Type`을 **절대 직접 설정하지 마세요.** 브라우저가 `multipart/form-data`와 boundary를 자동 설정합니다.

---

## ⚛️ 7. React Router v6.4+의 `<Form>`과 `action`

React Router는 SPA 라우팅과 form 처리를 통합한 `<Form>` 컴포넌트와 `action()` 함수 개념을 제공합니다.

### 7.1 `<Form>` 사용 예

```jsx
import { Form } from "react-router-dom";

export default function LoginForm() {
  return (
    <Form method="post" action="/login">
      <input name="username" />
      <input name="password" type="password" />
      <button type="submit">Login</button>
    </Form>
  );
}
```

---

### 7.2 `action()` 함수 정의

```jsx
// routes/login.jsx
export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === "admin" && password === "1234") {
    return redirect("/dashboard");
  }

  return { error: "Invalid credentials" };
}
```

---

### 7.3 라우터 설정

```jsx
import { createBrowserRouter } from "react-router-dom";
import LoginForm, { action as loginAction } from "./routes/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
    action: loginAction,
  },
]);
```

---

### 7.4 오류 처리 및 상태 전달

```jsx
import { useActionData } from "react-router-dom";

function LoginForm() {
  const actionData = useActionData();

  return (
    <Form method="post">
      <input name="username" />
      <input name="password" type="password" />
      <button type="submit">Login</button>
      {actionData?.error && <p>{actionData.error}</p>}
    </Form>
  );
}
```

---

## 🧠 마무리: 언제 어떤 방식이 좋을까?

| 상황                      | 추천 방식                                                |
| ------------------------- | -------------------------------------------------------- |
| 빠르게 간단한 서버에 전송 | HTML `<form>` + 기본 submit                              |
| 파일 업로드 포함          | `enctype="multipart/form-data"` + `multer` 같은 미들웨어 |
| 비동기 UX 필요            | `fetch()` + `FormData`                                   |
| React SPA 환경            | React Router `<Form>` + `action()` 구조                  |

---

## 📎 참고 요약

- 기본 `form` 전송은 `application/x-www-form-urlencoded` 인코딩을 사용
- 파일 전송은 `multipart/form-data` 필요
- `FormData`는 JS에서 파일 포함 데이터를 쉽게 만들 수 있음
- React Router의 `<Form>`은 form 제출을 SPA처럼 처리하면서도 HTML 구조와 접근성을 유지할 수 있음
