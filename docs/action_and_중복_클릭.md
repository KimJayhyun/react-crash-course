React Router의 `action` 기능은 **form 기반 라우팅(Form-Based Routing)** 패러다임에서 사용되는 기능으로,

**라우트에 제출된 `form` 요청을 처리하는 로직을 정의**하는 역할을 합니다.

이는 특히 React Router v6.4 이후 도입된 `Data APIs`의 일부입니다.

---

## 🔧 개념 요약

`action`은 특정 라우트에 대해 **POST, PUT, PATCH, DELETE** 같은 **mutation 요청을 처리**할 수 있는 함수입니다.

```jsx
{
  path: "/posts/:id/edit",
  element: <EditPost />,
  action: editPostAction,
}
```

`action`은 form 요소를 제출할 때 발생하는 요청을 처리하고,

`request` 객체를 통해 데이터를 읽고, 서버와 통신하거나 데이터를 조작할 수 있습니다.

---

## 📥 기본 동작

1. 사용자가 `<Form method="post">`와 같은 방식으로 폼을 제출하면,
2. React Router는 현재 매칭된 라우트의 `action` 함수를 실행합니다.
3. `action` 함수는 `Request` 객체를 인자로 받아, body, formData 등을 통해 데이터를 추출할 수 있습니다.
4. 리턴 값은 `useActionData()`를 통해 컴포넌트에서 접근 가능합니다.

---

## 🧪 예제

### 📄 라우트 정의

```jsx
import { createBrowserRouter } from "react-router-dom";
import ContactForm, { contactAction } from "./ContactForm";

const router = createBrowserRouter([
  {
    path: "/contact",
    element: <ContactForm />,
    action: contactAction,
  },
]);
```

### 📝 Form 컴포넌트

```jsx
import { Form, useActionData } from "react-router-dom";

export async function contactAction({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");

  // 여기에 서버 전송, 유효성 검사 등의 로직을 넣음
  if (!email.includes("@")) {
    return { error: "유효한 이메일을 입력하세요." };
  }

  return { success: true };
}

export default function ContactForm() {
  const data = useActionData();

  return (
    <Form method="post">
      <input name="name" />
      <input name="email" />
      <button type="submit">제출</button>
      {data?.error && <p style={{ color: "red" }}>{data.error}</p>}
      {data?.success && <p>성공적으로 제출되었습니다!</p>}
    </Form>
  );
}
```

---

## 🧩 주요 포인트

| 개념                          | 설명                                                                |
| ----------------------------- | ------------------------------------------------------------------- |
| `action({ request, params })` | `request`: Fetch API의 Request 인스턴스. `params`: URL 파라미터     |
| `Form`                        | `method="post"` 또는 `put`, `delete` 등 설정 가능. action이 실행됨. |
| `useActionData()`             | action 함수가 리턴한 데이터를 받아올 수 있음                        |
| Redirect                      | `redirect("/somewhere")` 사용 가능 (`react-router`에서 제공)        |

---

## ⚠️ 주의사항

- `action`은 GET 요청에서는 실행되지 않습니다. 이때는 `loader`를 사용합니다.
- 폼 외에도 `fetcher.submit()`을 이용해 프로그래밍적으로도 action을 트리거할 수 있습니다.
- 서버사이드와의 연동을 고려해 비동기로 작성하는 것이 일반적입니다.

---

## ✅ 활용 예시

- 게시글 작성/수정/삭제
- 로그인 폼 처리
- 사용자 정보 업데이트
- 관리자 승인 요청 등

---

## ✅ Submit 버튼 중복 클릭 문제 해결기

React + Vite 환경에서 `react-router`를 활용해 폼 기반 기능을 구현하던 중, Submit 버튼이 여러 번 눌려 **중복 요청이 발생하는 문제**를 겪었습니다.
이번 포스트에서는 이 문제의 원인과, React Router의 `useNavigation()` 훅을 통해 **깨끗하게 해결한 과정**을 소개합니다.

---

### 🧩 문제 상황

아래는 게시글을 작성하는 모달 컴포넌트입니다. 사용자가 내용을 입력하고 Submit을 누르면 서버로 POST 요청을 보내고 홈으로 리디렉션합니다.

```jsx
<Form method="post" className={classes.form}>
  <textarea name="body" required />
  <input name="author" type="text" required />
  <button type="submit">Submit</button>
</Form>
```

그리고 서버 요청은 `action()` 함수로 처리했습니다:

```js
export async function action({ request }) {
  const formdata = await request.formdata();
  const postdata = object.fromentries(formdata);

  await fetch("http://localhost:8080/posts", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: json.stringify(postdata),
  });

  return redirect("/");
}
```

하지만 이 상태에서는:

- Submit 버튼을 **여러 번 눌러도 계속 활성화된 상태**고,
- 그에 따라 **동일한 요청이 서버에 반복 전송**되는 문제가 있었습니다.

---

### 🔍 원인 분석

문제의 핵심은, React Router의 `<Form>`을 사용할 때 폼이 제출되는 동안 **자동으로 버튼 상태를 제어해주지 않는다는 것**입니다.

별도의 상태 관리 없이 `<button>`을 그대로 둔다면, 사용자는 빠르게 여러 번 클릭할 수 있습니다.
**`await fetch(...)`가 완료되기 전까지 버튼은 계속 살아 있는 셈**입니다.

---

### ✅ 해결 방법: `useNavigation()` 훅 활용

React Router는 폼 제출 상태를 추적할 수 있도록 `useNavigation()` 훅을 제공합니다. 이 훅을 통해 `"submitting"` 상태를 확인하고 버튼을 비활성화하면, 중복 클릭을 방지할 수 있습니다.

아래는 적용된 코드입니다:

```jsx
import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { Link, Form, redirect, useNavigation } from "react-router";

function NewPost() {
  const navigator = useNavigation();
  const isSubmitting = navigator.state === "submitting";

  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required name="author" />
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body : "...", author: "..."}

  await fetch("http://192.168.219.150:8080/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/");
}
```

### ✔️ 결과

- Submit 버튼은 **제출 중엔 비활성화**되어 중복 클릭이 불가능해졌고,
- `isSubmitting` 상태를 통해 사용자에게도 **“Submitting...”** 메시지를 보여줄 수 있어 UX도 향상되었습니다.

---

### 📌 핵심 요약

| 문제                                  | 해결 방법                                                       |
| ------------------------------------- | --------------------------------------------------------------- |
| 폼 제출 중 Submit 버튼 중복 클릭 가능 | `useNavigation()`으로 `submitting` 상태 확인 후 `disabled` 처리 |
| 서버에 중복 POST 요청 발생            | 버튼 비활성화로 물리적 클릭 자체 차단                           |
| 모달이 늦게 닫힘                      | 리디렉션까지 기다리며 사용자 입력 방지                          |

---

### 🔚 마무리

React Router의 `action`과 `useNavigation`은 각각:

- **데이터 전송 로직 분리**
- **제출 상태 기반 UX 제어**

를 책임지며, 함께 사용하면 보다 안정적이고 깔끔한 폼 흐름을 만들 수 있습니다.
