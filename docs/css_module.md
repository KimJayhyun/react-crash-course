### CSS Module이란?

CSS Module은 CSS를 **모듈화**하여 사용할 수 있도록 하는 기술로, 각 컴포넌트별로 스타일을 독립적으로 관리할 수 있도록 도와줍니다. 이는 전역 범위(global scope)에서 CSS 클래스가 충돌하는 문제를 해결하는 방식 중 하나입니다.

---

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

---

### 📌 CSS Module 사용법 (React 예제)
#### 1. CSS 파일 생성
먼저 `.module.css` 확장자를 가진 CSS 파일을 생성합니다.

```css
/* Button.module.css */
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
```

#### 2. React 컴포넌트에서 사용하기
```jsx
import styles from "./Button.module.css";

const Button = () => {
  return <button className={styles.button}>Click Me</button>;
};

export default Button;
```
> `styles.button`으로 클래스명을 가져오면, 자동으로 고유한 클래스명이 적용됩니다.

---

### 📌 변환된 CSS 예시
위의 `Button.module.css`에서 `.button`을 사용했다면, 실제로 빌드 후 변환된 CSS 클래스는 다음과 비슷하게 됩니다.

```css
.button__3jf6K {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
```
이처럼 **자동으로 유니크한 클래스명이 적용**되므로 다른 CSS 파일과 충돌하지 않습니다.

---

### 📌 동적 클래스명 (조건부 스타일 적용)
```jsx
import styles from "./Button.module.css";
import classNames from "classnames"; // 선택적 라이브러리

const Button = ({ isPrimary }) => {
  return (
    <button className={isPrimary ? styles.primary : styles.secondary}>
      Click Me
    </button>
  );
};
```
혹은 **템플릿 리터럴**을 사용할 수도 있습니다.

```jsx
<button className={`${styles.button} ${styles.primary}`}>Click Me</button>
```

---

### 📌 CSS Module을 사용하는 이유
✅ **네이밍 충돌 방지**  
✅ **컴포넌트 단위 스타일 관리 가능**  
✅ **CSS 전역 오염 방지**  
✅ **일반 CSS와 동일한 문법 사용 가능**  
✅ **React, Vue, Next.js 등 다양한 프레임워크에서 지원**

---

### 📌 정리
- **CSS Module은 스타일을 컴포넌트 단위로 모듈화하는 방식**
- `.module.css` 파일로 생성하여 `import` 하면 **로컬 범위의 스타일**이 적용됨
- 자동으로 네이밍 충돌을 방지하며, 유지보수성을 높일 수 있음

📌 특히 **React, Next.js, Vue 등에서 스타일을 관리할 때** 매우 유용한 기술입니다! 🚀

---

CSS Module 자체는 **React에 포함된 기능이 아니라, 웹팩(Webpack) 등의 번들러에서 지원하는 기능**입니다. 즉, **React가 자체적으로 제공하는 것이 아니라, 빌드 도구(예: Webpack, Vite, Parcel 등)에서 지원하는 기능**입니다.

---

## 📌 CSS Module은 별도 라이브러리인가?
**아니요!**  
CSS Module은 별도의 라이브러리를 설치할 필요 없이 **웹팩(Webpack) 등의 설정만으로 사용할 수 있는 기능**입니다.

---

## 📌 CSS Module이 동작하는 방식
1. `.module.css` 파일을 만들면, 웹팩(Webpack) 또는 Vite 같은 번들러가 이를 자동으로 처리함.
2. **클래스명을 해싱(hash) 처리하여 고유한 이름으로 변환**함.
3. `import styles from "./파일명.module.css";` 하면, `styles` 객체로 변환된 CSS 클래스를 사용할 수 있음.

---

## 📌 Webpack과 CSS Module
Webpack의 `css-loader`가 CSS Module을 지원하는 방식으로 동작합니다.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // CSS Module 활성화
            },
          },
        ],
      },
    ],
  },
};
```
이 설정이 있으면 `.module.css` 파일을 `import`할 때 자동으로 CSS Module이 적용됩니다.

---

## 📌 Vite에서 CSS Module 사용하기
Vite는 기본적으로 CSS Module을 지원하므로, 별도 설정 없이 `.module.css` 파일을 생성하여 사용할 수 있습니다.

---

## 📌 Next.js에서 CSS Module
Next.js에서는 기본적으로 **CSS Module이 내장**되어 있으며, `.module.css` 파일을 만들면 자동으로 적용됩니다.

---

## 📌 결론
✔ **CSS Module은 React의 기본 기능이 아니라, 웹팩(Webpack), Vite 등의 번들러가 처리하는 기능이다.**  
✔ 별도의 라이브러리를 설치할 필요 없이, `*.module.css` 파일을 만들고 `import`하면 사용할 수 있다.  
✔ Next.js, Vite 같은 최신 빌드 도구에서는 **기본적으로 지원**되므로 따로 설정할 필요가 없다. 🚀