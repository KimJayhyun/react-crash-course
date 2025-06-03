## Create react app with Vite

```bash
$> npm create vite # and you should choose right setting.

## Install dependency
$> npm install

## Run react app
$> npm run dev
```

## 18. 리액트와 컴포넌트 배우기

```jsx
// main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // `App.jsx`에 선언된 `APP` 객체
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

```jsx
function App() {
  return <h1>Hello World!</h1>;
}

export default App;
```

위 `App.jsx`의 `App`을 사용하는 것과 같이 `React`에서는 `function`을 개발하여 컴포넌트 단위로 사용한다.


## 19. 커스텀 컴포넌트 만들어보기

React 컴포넌트는 대문자로 시작해야 한다.

소문자로 시작할 경우, 표준 HTML 요소로 인식한다.

## 20. 동적인 값 출력하기

React에서 동적인 값을 사용하고 싶을 때, 아래와 같이 사용한다.

```jsx
function Post() {
    const chosenName = Math.random() > 0.5 ? names[0] : names[1];

    return <div>
        <p>{ 2 + 2 }</p>
        <p>{ chosenName }</p>
        <p>React.js is awesome!</p>
    </div>
} 
```

`2+2`와 같이 Javascript를 사용할 수도 있다.

## 21. 컴포넌트 재사용하기

```jsx
function App() {

  // 단 하나의 컴포넌트를 `return`
  return <main> 
    <Post />
    <Post />
    <Post />
  </main>;
}
```

`jsx`에서 `function`은 단 하나의 컴포넌트를 `return`해야 한다.

다만, 여러 개의 하위 컴포넌트를 가져도 된다.

만약 적당한 최상위 컴포넌트 `tag`가 없다면 `<></>` 혹은 `<React.Fragment></React.Fragment>`로 

`React Fragment`를 사용하면 된다.

- [React Fragment 공식문서](https://ko.legacy.reactjs.org/docs/fragments.html)


```jsx
function App() {

  // 단 하나의 컴포넌트를 `return`
//   return <> 
//     <Post />
//     <Post />
//     <Post />
//   </>;

  return <React.Fragment> 
    <Post />
    <Post />
    <Post />
  </React.Fragment>;
}
```

## 22. 컴포넌트에 속성 추가하기

`props` 예약어를 사용하여 아래와 같이 사용할 수 있다.

```jsx
function App() {
  return <main>
    <Post author="Maximilian" body="React.js is awesome!" />
    <Post author="Manuel" body="Check out full course!"/>
  </main>;
}
```

```jsx
function Post(props) {

    return <div>
        <p>{ props.author }</p>
        <p>{ props.body }</p>
    </div>
} 
```

## 23. `module.css` 파일로 CSS 스타일 적용하기

[css module](./docs/css_module.md)이란 `Webpack`에서 제공하는 기능으로

각 컴포넌트 별로 스타일을 독립적으로 관리하는 기능이다.

```jsx
import classes from "./Post.module.css";

function Post(props) {

    return <div className={classes.post}>
        <p className={classes.author}>{ props.author }</p>
        <p className={classes.text}>{ props.body }</p>
    </div>
} 
```

[`Post.module.css`](./src/components/Post.module.css)에는 `.post`, `.author`, `.text`가 구현되어 있다.

### 📌 주요 특징
1. **클래스 네이밍 충돌 방지**
   - CSS Module을 사용하면 클래스 이름이 **로컬 범위(local scope)** 로 제한되어, 전역 네임스페이스 오염을 방지할 수 있습니다.
   - 각 클래스는 **고유한 해시값**이 추가된 형태로 변환됩니다.
   
2. **자동 네임스페이싱**
   - 작성한 클래스 이름이 자동으로 **유니크한 네임스페이스**를 가지게 됩니다.
   - 예를 들어, `button`이라는 클래스를 여러 파일에서 사용해도 서로 영향을 주지 않습니다.

3. **일반 CSS 문법 사용 가능**
   - 기존의 CSS와 동일한 방식으로 작성할 수 있습니다.
   - SCSS(SASS) 같은 전처리기와도 함께 사용할 수 있습니다.

4. **React, Vue, Next.js 등에서 지원**
   - CSS Module은 다양한 프레임워크에서 사용 가능합니다.

## 26. 이벤트 리스너 추가하기

```jsx
function NewPost() {
  // 기존 바닐라 JS 방식
  // document.querySelector("textarea").addEventListener("change", function (event) {});

  function changeBodyHandler(event) {
    // textarea의 변경된 text를 return
    console.log(event.target.value);
  }

  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={changeBodyHandler} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required />
      </p>
    </form>
  );
}
```

## 27. 상태 적용하기

`jsx`는 랜더링할 때, 한 번만 실행되므로, 아래와 같이 변수를 사용하면 적용이 되지 않음

```jsx
  let enteredBody = "Init Value";

  function changeBodyHandler(event) {
    enteredBody = event.target.value;
  }

  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={changeBodyHandler} />
      </p>
      <!-- `enteredBody`의 초기값 ""이 들어감 -->
      <p>{enteredBody}</p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required />
      </p>
    </form>
  );
```

위 문제를 해결하기 위해서는 `React`에서 제공하는 `State`를 사용해야함.

```jsx
  // 초기값, 변수 변환 함수
  const [enteredBody, setEnteredBody] = useState("");

  // document.querySelector("textarea").addEventListener("change", function (event) {});
  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }
```

## 28. 상태 올리기


---

> After now, here is default `README.md`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
