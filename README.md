# useSubscribable

Allows dereferencing of Observables (see [RxJS](https://rxjs-dev.firebaseapp.com/)) using [React hooks](https://reactjs.org/docs/hooks-intro.html).

## Install

```
yarn add use-subscribable
```

## Use


```ts
import { 
  useRx,
  useSubscribable,
  useObservable, 
  useSubject, 
  useBehaviorSubject 
} from "use-subscribable";
```

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { interval } from "rxjs";
import { useObservable } from "use-subscribable";

const intCounter = interval(1000);

const App = () => {
  const [count, setCount] = React.useState(0);
  const obsCount = useObservable(intCounter, 0);

  return (
    <div>
      <div>The observable count is: {obsCount}</div>
      <div>The click counter is: {count}</div>
      <div>The total count is: {obsCount + count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```
