import React, { useState } from "react";
import ReactDOM from "react-dom";
import { interval, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { altCounter } from './alt'
import { useSubscribe, Subscribe } from "../src";


const counter = interval(1000)

class AppA extends React.Component {
  @Subscribe(altCounter)
  count: number = 0

  render() {
    return <div>Count: {this.count}</div>
  }
}

class AppB extends React.Component {
  @Subscribe(altCounter)
  count: number = 0

  render() {
    return <div>Count: {this.count}</div>
  }
}

const App = () => {
  const [ page, setPage ] = useState('A')

  const toggle = () => {
    if (page === 'A') {
      setPage('B')
    } else {
      setPage('A')
    }
  }

  return (<div>
      <button onClick={toggle}>Toggle</button>
      { page === 'A' ? <AppA /> : undefined }
      { page === 'B' ? <AppB /> : undefined }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
