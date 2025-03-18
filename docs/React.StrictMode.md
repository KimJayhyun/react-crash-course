### `<React.StrictMode>`란?

**`<React.StrictMode>`**는 **React에서 애플리케이션의 잠재적인 문제를 감지하고 경고하는 도구**입니다. 개발 환경에서만 활성화되며, **배포(production) 환경에서는 아무 영향도 주지 않습니다.**

---

## **🚀 주요 기능 (React.StrictMode의 역할)**

### 1️⃣ **안전하지 않은 라이프사이클 메서드 감지**
React에서는 일부 **기존 클래스형 컴포넌트의 라이프사이클 메서드가 안전하지 않음**을 인식하고, 이를 사용하는 경우 경고를 출력합니다.

#### 🚨 감지 대상 메서드:
- `componentWillMount()`
- `componentWillReceiveProps()`
- `componentWillUpdate()`

이 메서드들은 **비동기 렌더링을 방해할 가능성이 있기 때문에** React에서는 `UNSAFE_` 접두어를 붙이도록 권장합니다.

✅ **올바른 예제**
```jsx
class MyComponent extends React.Component {
  UNSAFE_componentWillMount() {
    console.log("This is unsafe and should be avoided!");
  }
  render() {
    return <h1>Hello, StrictMode!</h1>;
  }
}
```
Strict Mode를 사용하면 이와 같은 메서드가 포함된 컴포넌트에 대해 경고를 출력합니다.

---

### 2️⃣ **의심스러운 사이드 이펙트 감지**
React의 **렌더링 방식 변경(Concurrent Mode)**을 고려할 때, 일부 코드는 예상치 못한 동작을 할 수 있습니다.

- 예를 들어, **`useEffect`의 클린업 함수가 두 번 호출되는지 확인**할 수 있습니다.

✅ **올바른 예제**
```jsx
import React, { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    console.log("Effect 실행");

    return () => {
      console.log("클린업 함수 실행");
    };
  }, []);

  return <h1>Hello, React.StrictMode!</h1>;
}

export default function App() {
  return (
    <React.StrictMode>
      <MyComponent />
    </React.StrictMode>
  );
}
```

🚨 **Strict Mode가 활성화된 경우**
- `useEffect`의 클린업 함수(`return () => {}` 부분)가 **두 번 실행**되는 것을 볼 수 있습니다.
- 이는 **안전하지 않은 사이드 이펙트(예: API 호출 중복, 메모리 누수 등)를 감지하기 위한 React의 의도적인 동작**입니다.

---

### 3️⃣ **오래된 문자열 ref 사용 감지**
React에서는 **문자열 ref 사용을 지양**하고, `useRef` 또는 `createRef()`를 사용하는 것을 권장합니다.

🚨 **문자열 ref (경고 발생)**
```jsx
class MyComponent extends React.Component {
  render() {
    return <input ref="myInput" />;
  }
}
```

✅ **올바른 사용법**
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }

  render() {
    return <input ref={this.myInput} />;
  }
}
```
Strict Mode는 위와 같이 **문자열 ref 대신 `createRef()`나 `useRef()` 사용을 권장**합니다.

---

### 4️⃣ **레거시 Context API 감지**
React의 **기존 Context API (`contextTypes`, `childContextTypes`)는 최신 API인 `React.createContext()`로 대체**되었습니다.  
Strict Mode를 사용하면 **오래된 방식의 Context API 사용을 감지하고 경고**를 출력합니다.

🚨 **레거시 Context API 사용 예제**
```jsx
class MyComponent extends React.Component {
  static contextTypes = {
    theme: PropTypes.string,
  };
  render() {
    return <div>{this.context.theme}</div>;
  }
}
```
✅ **올바른 예제 (React.createContext() 사용)**
```jsx
const ThemeContext = React.createContext("light");

function MyComponent() {
  const theme = React.useContext(ThemeContext);
  return <div>{theme}</div>;
}
```
Strict Mode는 **오래된 방식이 사용될 경우 경고**하여 최신 API로의 전환을 유도합니다.

---

## **🛠 React.StrictMode 사용 방법**
`<React.StrictMode>`는 루트 요소를 감싸는 형태로 사용합니다.

### ✅ **기본적인 사용법**
```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### ✅ **특정 컴포넌트에만 적용할 수도 있음**
```jsx
function App() {
  return (
    <div>
      <React.StrictMode>
        <ComponentWithStrictMode />
      </React.StrictMode>
      <ComponentWithoutStrictMode />
    </div>
  );
}
```
- `ComponentWithStrictMode`에는 **Strict Mode 기능이 적용**됨.
- `ComponentWithoutStrictMode`에는 **Strict Mode가 적용되지 않음**.

---

## **🔍 React.StrictMode의 영향**
| 기능 | StrictMode 적용 여부 |
|------|----------------|
| 라이프사이클 메서드 감지 (`componentWillMount` 등) | ✅ 가능 |
| useEffect의 클린업 함수 두 번 실행 | ✅ 가능 |
| 문자열 ref 사용 감지 | ✅ 가능 |
| 레거시 Context API 사용 감지 | ✅ 가능 |
| 배포 환경에서 동작 여부 | ❌ (개발 환경에서만 작동) |

---

## **🎯 결론**
✅ **React.StrictMode는 React 애플리케이션의 잠재적인 문제를 사전에 감지하고 예방하는 도구**입니다.  
✅ **개발 환경에서만 작동하며, 배포(production) 환경에서는 영향을 주지 않습니다.**  
✅ **비동기 렌더링(Concurrent Mode) 대비, 안전하지 않은 코드를 찾아내는 역할을 합니다.**  
✅ **Strict Mode를 사용하면 미래 React 업데이트에 대비하기 쉬워집니다! 🚀**