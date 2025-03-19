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

---

> After now, here is default `README.md`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
