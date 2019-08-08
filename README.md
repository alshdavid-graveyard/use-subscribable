# useSubscribable

Allows dereferencing of Observables (see [RxJS](https://rxjs-dev.firebaseapp.com/)) using [React hooks](https://reactjs.org/docs/hooks-intro.html).

## Install

```
yarn add use-subscribe
```

## Use


```ts
import { useSubscribe, Subscribe } from "use-subscribe";
```

## Hooks

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { interval } from "rxjs";
import { useSubscribe } from "use-subscribe";

const intCounter = interval(1000);

const App = () => {
  const [count, setCount] = React.useState(0);
  const obsCount = useSubscribe(intCounter, 0);

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

## Decorators

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { interval } from "rxjs";
import { Subscribe } from "use-subscribe";

const counter = interval(1000)

class App extends React.Component {
  @Subscribe(counter)
  count: number = 0

  render() {
    return (
      <div>{this.counter}</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```