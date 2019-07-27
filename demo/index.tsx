import React from "react";
import ReactDOM from "react-dom";
import { interval, BehaviorSubject } from "rxjs";
import { useObservable, useBehaviorSubject, useSubscribable } from "../src";

const createBehaviorCounter = () => {
  let i = 0
  const $ = new BehaviorSubject(i)

  setInterval(() => {
    $.next(i)
    i++
  }, 1000)

  return $
}
const behav44iorCounter = createBehaviorCounter()



const counter = interval(1000)

const App = () => {  
  const count = useSubscribable(counter);

  return (
    <div>Count: {count}</div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
