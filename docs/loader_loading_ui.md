## 🎬 React Suspense를 활용한 Streaming

React의 **Suspense를 활용한 스트리밍**은 앱이 **초기 렌더링 속도를 높일 수 있도록** 도와준다.
즉, **중요하지 않은 데이터를 지연**시켜 UI 렌더링을 먼저 **언블로킹(선 처리)** 할 수 있게 한다.

React Router는 Suspense와 함께 동작할 수 있도록, **loader나 action에서 Promise를 반환**하는 기능을 지원한다.

---

## 1️⃣ loader에서 Promise 반환하기

React Router는 컴포넌트를 렌더링하기 전에 `loader`가 완료될 때까지 기다린다.
**중요하지 않은 데이터를 기다리지 않도록** 하려면 `await`하지 말고, **Promise 자체를 반환**해야 한다.

```ts
export async function loader({}: Route.LoaderArgs) {
  // 중요하지 않은 데이터 → 바로 반환 (await하지 않음)
  let nonCriticalData = new Promise((res) =>
    setTimeout(() => res("non-critical"), 5000)
  );

  // 중요한 데이터 → 반드시 await (즉시 사용 필요)
  let criticalData = await new Promise((res) =>
    setTimeout(() => res("critical"), 300)
  );

  return { nonCriticalData, criticalData };
}
```

> ⚠️ 주의: loader에서는 **단일 Promise가 아닌, 객체 형태로 반환**해야 한다.

---

## 2️⃣ fallback UI와 함께 Suspense + Await 사용하기

`loaderData`로부터 받은 Promise를 `<Await>`로 감싸서 처리한다.
`<Suspense>`는 아직 준비되지 않은 경우 fallback UI를 보여준다.

```tsx
export default function MyComponent({ loaderData }: Route.ComponentProps) {
  let { criticalData, nonCriticalData } = loaderData;

  return (
    <div>
      <h1>Streaming example</h1>
      <h2>Critical data value: {criticalData}</h2>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={nonCriticalData}>
          {(value) => <h3>Non critical value: {value}</h3>}
        </Await>
      </React.Suspense>
    </div>
  );
}
```

---

## ⚛️ React 19에서의 처리 방식

React 19에서는 `<Await>` 대신 `React.use()`를 사용할 수 있다.
단, **Suspense를 트리거하려면** `Promise`를 **하위 컴포넌트로 전달**해야 한다.

```tsx
<React.Suspense fallback={<div>Loading...</div>}>
  <NonCriticalUI p={nonCriticalData} />
</React.Suspense>;

function NonCriticalUI({ p }: { p: Promise<string> }) {
  let value = React.use(p);
  return <h3>Non critical value: {value}</h3>;
}
```

---

## ⏱️ Promise 타임아웃 설정

기본적으로 loader나 action에서 반환된 Promise는 **4950ms 이후 자동으로 reject**된다.
이 시간을 조절하려면 `entry.server.tsx`에서 `streamTimeout` 값을 설정하면 된다.

```ts
// 예: 핸들러 내 미해결 Promise를 10초 후 reject
export const streamTimeout = 10_000;
```
