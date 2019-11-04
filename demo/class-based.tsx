import React from "react";
import { Subscribe } from "../src";
import { Observable } from "rxjs";
import { altCounter } from "./alt";

interface AppBProps {
  counter: Observable<number>
  altCounter: typeof altCounter
}

export class AppB extends React.Component<AppBProps> {
  @Subscribe((props: AppBProps) => props.counter)
  count: number = 0

  @Subscribe((props: AppBProps) => props.altCounter)
  altCount: number = 0

  render() {
    return <div>
      <b>Class Based</b><br/>
      Count: {this.count}<br/>
      AltCount: {this.altCount}
    </div>
  }
}