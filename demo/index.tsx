import React, { useState } from "react";
import ReactDOM from "react-dom";
import { interval } from "rxjs";
import { altCounter } from './alt'
import { AppA } from "./func-based";
import { AppB } from "./class-based";

const counter = interval(1000)

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
      { page === 'A' ? <AppA counter={counter} altCounter={altCounter} /> : undefined }
      { page === 'B' ? <AppB counter={counter} altCounter={altCounter} /> : undefined }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
